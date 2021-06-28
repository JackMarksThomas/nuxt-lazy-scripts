import throttle from 'lodash/throttle'

class ScrollThrottleSubject {
  constructor () {
    this.observers = []
    this.subscribe = this.subscribe.bind(this)
    this.onScroll = this.onScroll.bind(this)
  }

  subscribe (observer) {
    this.observers.push(observer)
  }

  unsubscribe (observer) {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  onScroll () {
    if (!this.observers.length) { return }
    this.observers.forEach(observer => {
      if (window.scrollY <= observer.scrollPoint) { return }
      observer.update()
      this.unsubscribe(observer)
    })
  }
}

class Observer {
  constructor (scrollPoint, timeout, paths, script) {
    this.scrollPoint = scrollPoint
    this.timeout = timeout
    this.paths = paths
    this.loaded = false
    this.script = script
  }

  async loadScript() {
    try {
      await loadScript(this.script)
    } catch (error) {
      console.error(error)
    }
  }

  startTimeout() {
    setTimeout(() => {
      this.loadScript()
      this.clearTimeout()
    }, this.timeout)
  }

  clearTimeout() {
    clearTimeout(this.startTimeout)
  }

  update() {
    console.log('I WAS CALLED', this.script)
  }
}

function loadScript (script) {
  return new Promise(function (resolve, reject) {
    let shouldAppend = false
    let el = document.querySelector('script[src="' + script.src + '"]')
    if (!el) {
      el = document.createElement('script')
      el.type = 'text/javascript'
      el.async = true
      el.id = script.id
      el.src = script.src
      shouldAppend = true
    } else if (el.hasAttribute('data-loaded')) {
      console.log('Script already added', script.id)
      resolve(el)
      return
    }

    el.addEventListener('error', reject)
    el.addEventListener('abort', reject)
    el.addEventListener('load', function loadScriptHandler () {
      console.log('Script loaded', script.id)
      el.setAttribute('data-loaded', true)
      resolve(el)
    })

    if (shouldAppend) {
      document.head.appendChild(el)
      console.log('Script appended ', script.id)
    }
  })
}

function unloadScript (script) {
  return new Promise(function (resolve, reject) {
    const el = document.querySelector('script[src="' + script.src + '"]')

    if (!el) {
      reject(Error('Element does not exist.'))
      return
    }

    document.head.removeChild(el)

    resolve()
  })
}

function timeoutHandler (script, timeout, scrollSubject) {
  setTimeout(async () => {
    await loadScript(script)
    console.log('on timeout ran')
    clearTimeout(timeoutHandler)
    scrollSubject.unsubscribe(script)
  }, timeout)
}

function scrollPointTest (scripts) {
  return !!scripts.find(script => script.scrollPoint)
}

function handleLoadingConditions (scripts, currentPath) {
  if (!window || !scripts || !scripts.length) { return }

  const scrollSubject = new ScrollThrottleSubject()

  if (scrollPointTest(scripts)) {
    window.addEventListener('scroll', throttle(scrollSubject.onScroll, 300), { passive: true })
  }

  scripts.forEach(script => {
    const {
      scrollPoint = false,
      timeout = false,
      paths = false
    } = script

    if (paths && !paths.includes(currentPath)) {
      return
    }

    if (!scrollPoint && !timeout) {
      loadScript(script)
      return
    }

    console.log(scrollPoint, timeout, paths, script)
    const scriptLoadObserver = new Observer(scrollPoint, timeout, paths, script)
    console.log(scriptLoadObserver)
    scrollSubject.subscribe(scriptLoadObserver)
    console.log(scrollSubject)

    // if (scrollPoint) {
    //   scrollSubject.subscribe(script)
    // }


    // if (timeout) {
    //   timeoutHandler(script, timeout, scrollSubject)
    // }
  })
}

export default function ({ app, route }, inject) {
  const options = JSON.parse('<%= JSON.stringify(options) %>')
  const { scripts } = options

  if (!app.mixins) {
    app.mixins = []
  }

  // TODO remove all event listeners & fail early
  // TODO if all scripts are already loaded
  // app.router.beforeEach((to, from, next) => {
  //   if (window) {
  //     window.removeEventListener('scroll', throttle(scrollSubject.onScroll, 300), { passive: true })
  //     clearTimeout(timeoutHandler)
  //   }
  //   next()
  // })

  app.mixins.push({
    mounted () {
      handleLoadingConditions(scripts, route.path)
    },
    watch: {
      $route ({ path }) {
        handleLoadingConditions(scripts, path)
      }
    }
  })

  inject('loadScript', loadScript)
  inject('unloadScript', unloadScript)
}
