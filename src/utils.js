const validateEmail = (email) => {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function saveState (name,state) {
    try {
      const serialState = JSON.stringify(state);
      localStorage.setItem(name, serialState);
    } catch(err) {
        console.log(err);
    }
};

function loadState(name) {
    try {
      const serialState = localStorage.getItem(name);
      if (serialState === null) {
        return undefined;
      }
      return JSON.parse(serialState);
    } catch (err) {
      return undefined;
    }
};

export { validateEmail, classNames, saveState, loadState }