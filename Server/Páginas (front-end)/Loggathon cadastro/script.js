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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

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

var App = (function(_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(
      this,
      (App.__proto__ || Object.getPrototypeOf(App)).call(this, props)
    );

    _this.state = {
      nomeLoja: { value: "", required: true },
      CNPJ: { value: "", required: true },
      enderecoRua: { value: "", required: true },
      enderecoNumero: { value: "", required: true },
      complemento: { value: "", required: false },
      bairro: { value: "", required: false },
      cidade: { value: "", required: true },
      estado: { value: "", required: true },
      CEP: { value: "", required: true },
      tipoLoja: { value: "", required: true },
      nome: { value: "", required: true },
      sobrenome: { value: "", required: true },
      telComercial: { value: "", required: true },
      telCelular: { value: "", required: false },
      email: { value: "", required: true },
      horaAbertura: { value: "", required: true },
      horaFechamento: { value: "", required: true },
      diasFuncionamento: {
        value: {
          domingo: false,
          segunda: false,
          terça: false,
          quarta: false,
          quinta: false,
          sexta: false,
          sábado: false
        },
        required: true
      },
      formFilled: false
    };

    _this.formSender = _this.formSender.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleState = _this.handleState.bind(_this);
    _this.handleDay = _this.handleDay.bind(_this);
    _this.handleType = _this.handleType.bind(_this);
    _this.cepBlur = _this.cepBlur.bind(_this);
    return _this;
  }

  _createClass(App, [
    {
      key: "handleChange",
      value: function handleChange(event) {
        this.setState(
          _defineProperty({}, event.target.id, {
            value: event.target.value,
            required: this.state[event.target.id]["required"]
          })
        );
      }
    },
    {
      key: "handleState",
      value: function handleState(event) {
        console.log("Entered!");
        this.setState({
          estado: {
            value: event.target.value,
            required: this.state.estado.required
          }
        });
      }
    },
    {
      key: "cepBlur",
      value: function cepBlur() {
        fetch("https://viacep.com.br/ws/01001000/json/unicode/", {
          method: "GET"
        }).then(function(response) {
          for (let entry in response) {
            console.log(entry);
            console.log(JSON.stringify(response[entry]));
          }
        });
      }
    },
    {
      key: "handleType",
      value: function handleType(event) {
        this.setState({
          tipoLoja: {
            value: event.target.value,
            required: this.state.tipoLoja.required
          }
        });
      }
    },
    {
      key: "handleDay",
      value: function handleDay(event) {
        //console.log('Handling Day!');
        var middleman = this.state.diasFuncionamento;
        middleman.value[event.target.id] = !this.state.diasFuncionamento.value[
          event.target.id
        ];
        //console.log(JSON.stringify(middleman));
        this.setState({
          diasFuncionamento: middleman
        });
      }
    },
    {
      key: "formSender",
      value: function formSender() {
        var formInfo = {};
        var inadequacyCounter = 0;
        var daysCounter = 0;
        for (var entry in this.state) {
          if (entry !== "formFilled") {
            formInfo[entry] = this.state[entry];
          }
        }
        console.log(JSON.stringify(formInfo));
        for (var _entry in formInfo) {
          if (formInfo[_entry].value === "" && formInfo[_entry].required) {
            console.log(
              JSON.stringify(_defineProperty({}, _entry, formInfo[_entry]))
            );
            inadequacyCounter++;
          }
        }
        for (var _entry2 in formInfo["diasFuncionamento"]["value"]) {
          if (formInfo["diasFuncionamento"]["value"][_entry2]) {
            daysCounter++;
          }
        }
        if (daysCounter > 0 && inadequacyCounter === 0) {
          this.setState({
            formFilled: !this.state.formFilled
          });
        } else {
          console.log(daysCounter);
          console.log(inadequacyCounter);
          alert(
            "O preenchimento do formulário está inadequado! Por favor preencha todos os campos obrigatórios."
          );
        }
        for (var _entry3 in formInfo) {
          if (formInfo[_entry3] === "") {
            inadequacyCounter += 1;
            console.log("The input is inadequate!");
          }
        }
        console.log(JSON.stringify(formInfo));
        if (this.state.formFilled) {
			console.log(JSON.stringify("enviando"));
          fetch("http://localhost:5000/", {
            method: "POST",
            body: JSON.stringify(formInfo),
            headers: {
              "Content-type": "text/plain; charset=UTF-8"
            }
          })
        }
      }
    },
    {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { id: "app-frame" },
          React.createElement(Form, {
            sendForm: this.formSender,
            changeHandler: this.handleChange,
            stateHandler: this.handleState,
            dayHandler: this.handleDay,
            typeHandler: this.handleType,
            cep: this.cepBlur
          })
        );
      }
    }
  ]);

  return App;
})(React.Component);

var Form = function Form(props) {
  var tabelaEstados = {
    AC: "Acre",
    AL: "Alagoas",
    AP: "Amapá",
    AM: "Amazonas",
    BA: "Bahia",
    CE: "Ceará",
    DF: "Distrito Federal",
    ES: "Espírito Santo",
    GO: "Goiás",
    MA: "Maranhão",
    MT: "Mato Grosso",
    MS: "Mato Grosso do Sul",
    MG: "Minas Gerais",
    PA: "Pará",
    PB: "Paraíba",
    PR: "Paraná",
    PE: "Pernambuco",
    PI: "Piauí",
    RJ: "Rio de Janeiro",
    RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul",
    RO: "Rondônia",
    RR: "Roraima",
    SC: "Santa Catarina",
    SP: "São Paulo",
    SE: "Sergipe",
    TO: "Tocantins"
  };
  var listaEstados = [];
  for (var entry in tabelaEstados) {
    listaEstados.push(tabelaEstados[entry]);
  }
  var optionList = listaEstados.map(function(entry, index) {
    var middleman = entry.split(" ");
    var resultContent = middleman.join("-").toLowerCase();
    //console.log(JSON.stringify(entry));
    //console.log(JSON.stringify(resultContent));
    //console.log(`<option id=${resultContent} key=${index} value=${resultContent}>${entry}</option>`)
    return React.createElement(
      "option",
      { id: resultContent, key: index, value: resultContent },
      entry
    );
  });
  var listaDias = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ];
  var checkboxList = listaDias.map(function(entry, index) {
    return React.createElement(
      "div",
      { className: "dias-funcionamento", key: index },
      React.createElement(
        "label",
        { className: "form-label dias-label", key: index + 7 },
        entry
      ),
      React.createElement("input", {
        type: "checkbox",
        className: "regular-checkbox",
        id: entry.toLowerCase(),
        key: index + 14,
        onClick: props.dayHandler
      })
    );
  });
  //console.log(JSON.stringify(listaEstados));
  return React.createElement(
    "div",
    { id: "form-box" },
    React.createElement(
      "form",
      null,
      React.createElement(
        "div",
        { id: "section-1" },
        React.createElement(
          "h2",
          { className: "section-title" },
          "Informa\xE7\xF5es da Loja"
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { htmlFor: "nome-loja", className: "form-label" },
            "Nome da Loja",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "text",
            id: "nomeLoja",
            className: "ipt-text",
            onChange: props.changeHandler,
            placeholder: "ex: Mercearia da Dona Maria"
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { htmlFor: "CNPJ", className: "form-label" },
            "CPNJ",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "text",
            id: "CNPJ",
            className: "ipt-text",
            onChange: props.changeHandler,
            placeholder: "ex: 17.875.341/0001-03"
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { className: "form-label" },
            "Logradouro",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "text",
            id: "enderecoRua",
            className: "ipt-text",
            onChange: props.changeHandler,
            placeholder: "ex: Rua das Laranjeiras"
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { htmlFor: "numero-endereco", className: "form-label" },
            "N\xFAmero",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "number",
            id: "enderecoNumero",
            placeholder: "ex: 1000",
            className: "ipt-text",
            onChange: props.changeHandler
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { htmlFor: "complemento", className: "form-label" },
            "Complemento"
          ),
          React.createElement("input", {
            type: "text",
            id: "complemento",
            placeholder: "ex: Apartamento 123, Bloco A",
            className: "ipt-text",
            onChange: props.changeHandler
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { htmlFor: "bairro", className: "form-label" },
            "Bairro"
          ),
          React.createElement("input", {
            type: "text",
            id: "bairro",
            className: "ipt-text",
            placeholder: "ex: Bairro Jardim",
            onChange: props.changeHandler
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { htmlFor: "cidade", className: "form-label" },
            "Cidade",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "text",
            id: "cidade",
            className: "ipt-text",
            placeholder: "ex: Miracema do Tocatins",
            onChange: props.changeHandler
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { htmlFor: "estado", className: "form-label" },
            "Estado",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement(
            "select",
            { onChange: props.stateHandler, id: "state-select" },
            optionList
          )
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { htmlFor: "CEP", className: "form-label" },
            "C\xF3digo Postal (CEP)",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "text",
            id: "CEP",
            className: "ipt-text",
            onBlur: props.cep,
            onChange: props.changeHandler,
            placeholder: "ex: 01000001"
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { className: "form-label" },
            "Tipo de loja",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement(
            "select",
            { multiple: true, onChange: props.typeHandler, id: "type-select" },
            React.createElement("option", { value: "padaria" }, "Padaria"),
            React.createElement("option", { value: "mercearia" }, "Mercearia"),
            React.createElement(
              "option",
              { value: "farm\xE1cia" },
              "Farm\xE1cia"
            ),
            React.createElement(
              "option",
              { value: "conveniencia" },
              "Loja de conveni\xEAncia"
            ),
            React.createElement(
              "option",
              { value: "posto" },
              "Posto de gasolina"
            )
          )
        ),
		React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { className: "form-label" },
            "Hor\xE1rio de abertura",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "text",
            id: "horaAbertura",
            className: "ipt-text",
            placeholder: "ex: 08:00",
            onChange: props.changeHandler
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { className: "form-label" },
            "Hor\xE1rio de fechamento",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "text",
            id: "horaFechamento",
            className: "ipt-text",
            placeholder: "ex: 20:00",
            onChange: props.changeHandler
          })
        ),
		React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { id: "dias-section-label", className: "form-label" },
            "Dias de Funcionamento",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          checkboxList
        ),
      ),
      React.createElement(
        "div",
        { id: "section-2" },
        React.createElement(
          "h2",
          { className: "section-title" },
          "Informa\xE7\xF5es de Contato"
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { className: "form-label" },
            "Nome",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "text",
            id: "nome",
            className: "ipt-text",
            placeholder: "ex: Jo\xE3o",
            onChange: props.changeHandler
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { className: "form-label" },
            "Sobrenome",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "text",
            id: "sobrenome",
            className: "ipt-text",
            placeholder: "ex: Silva",
            onChange: props.changeHandler
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { className: "form-label" },
            "Telefone Comercial",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "text",
            id: "telComercial",
            className: "ipt-text",
            placeholder: "ex: (11)0800-0800",
            onChange: props.changeHandler
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { className: "form-label" },
            "Telefone Celular"
          ),
          React.createElement("input", {
            type: "text",
            id: "telCelular",
            className: "ipt-text",
            placeholder: "ex: (11)90800-0800",
            onChange: props.changeHandler
          })
        ),
        React.createElement(
          "div",
          { className: "form-div" },
          React.createElement(
            "label",
            { className: "form-label" },
            "Email",
            React.createElement("span", { className: "req-star" }, "*")
          ),
          React.createElement("input", {
            type: "text",
            id: "email",
            className: "ipt-text",
            placeholder: "ex: meuemail@dominio.com",
            onChange: props.changeHandler
          })
        ),
        React.createElement(
          "div",
          { id: "too-tired" },
          React.createElement(
            "div",
            { id: "termos-div", className: "form-div" },
            React.createElement(
              "label",
              { className: "form-label", id: "terms-label" },
              "Eu li e aceito os ",
              React.createElement("a", { href: "#" }, "termos de privacidade")
            ),
            React.createElement("input", {
              type: "checkbox",
              className: "regular-checkbox terms-checkbox",
              id: "termos-de-privacidade"
            })
          ),
          React.createElement(
            "div",
            { className: "form-div submit-div" },
            React.createElement(
              "button",
              { id: "submit-btn", type: 'button', onClick: props.sendForm },
              "Enviar!"
            )
          )
        )
      )
    )
  );
};

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById("page-main")
);
