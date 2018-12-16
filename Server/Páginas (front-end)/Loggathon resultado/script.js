"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function renderApp(file) {
  console.log(JSON.stringify(file));

  var App = (function(_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
      _classCallCheck(this, App);

      var _this = _possibleConstructorReturn(
        this,
        (App.__proto__ || Object.getPrototypeOf(App)).call(this, props)
      );

      _this.state = {
        showAccepted: file.showAccepted,
        registerStatus: file.registerStatus,
        clientName: file.clientName
      };
      _this.dismissPopup = _this.dismissPopup.bind(_this);
      return _this;
    }

    _createClass(App, [
      {
        key: "dismissPopup",
        value: function dismissPopup() {
          this.setState({ showAccepted: false });
        }
      },
      {
        key: "render",
        value: function render() {
          return React.createElement(
            "div",
            { id: "app-frame" },
            React.createElement(
              "header",
              { id: "page-header" },
              this.state.registerStatus
                ? this.state.showAccepted
                  ? React.createElement("h1", { id: "header-text" }, "Sucesso!")
                  : React.createElement("h1", { id: "header-text" }, "Entregas")
                : React.createElement("h1", { id: "header-text" }, "Ops...")
            ),
            React.createElement(
              "main",
              { id: "page-content" },
              this.state.registerStatus
                ? React.createElement(AcceptedUI, {
                    name: this.state.clientName,
                    show: this.state.showAccepted,
                    dismiss: this.dismissPopup
                  })
                : React.createElement(RejectedUI, null)
            ),
            React.createElement("footer", { id: "page-footer" })
          );
        }
      }
    ]);

    return App;
  })(React.Component);

  ReactDOM.render(
    React.createElement(App, null),
    document.getElementById("root")
  );
}

var AcceptedUI = function AcceptedUI(props) {
  return React.createElement(
    "div",
    { id: "accepted-box" },
    React.createElement(
      "div",
      { className: "shipping-info" },
      React.createElement(
        "h2",
        { className: "section-head" },
        "Entregas a caminho"
      ),
      React.createElement(
        "p",
        { classname: "m-0" },
        "Por enquanto n\xE3o h\xE1 entregas a caminho!"
      )
    ),
    React.createElement("hr", null),
    React.createElement(
      "div",
      { className: "shipping-info" },
      React.createElement(
        "h2",
        { className: "section-head" },
        "Entregas com voc\xEA"
      ),
      React.createElement(
        "p",
        { classname: "m-0" },
        "No momento n\xE3o h\xE1 entregas com voc\xEA."
      )
    ),
    props.show &&
      React.createElement(
        "div",
        { id: "accepted-request" },
        React.createElement(
          "button",
          { type: "button", id: "exit-btn", onClick: props.dismiss },
          React.createElement("i", { class: "fas fa-times" })
        ),
        React.createElement(
          "p",
          null,
          "Parab\xE9ns! Agora voc\xEA \xE9 um PA registrado da Loggi."
        )
      )
  );
};

var RejectedUI = function RejectedUI(props) {
  return React.createElement(
    "div",
    { id: "rejected-box" },
    React.createElement(
      "h2",
      { id: "reject-text" },
      "Infelizmente,",
      React.createElement("br", null),
      " n\xE3o foi dessa vez... :("
    )
  );
};

renderApp({ showAccepted: true, registerStatus: true, clientName: "Daniel" });
