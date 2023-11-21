import { useEffect, useState } from "react";
import "./App.css";

const data = [
  {
    name: "name",
    type: "text",
    default_value: "default hello",
    value: "",
    validation: "[a-zA-Z]*",
  },
  {
    name: "age",
    type: "number",
    default_value: 10,
    value: 0,
    min_value: 0,
    max_value: 100,
  },
  {
    name: "gender",
    type: "dropdown",
    default_value: "option3",
    value: "option2",
    options: ["option1", "option2", "option3"],
  },
  {
    name: "biography",
    type: "longtext",
    default_value: "default long text",
    value: "long text",
    validation: "[a-zA-Z0-9 ]*",
  },
  {
    name: "biography2",
    type: "longtext",
    default_value: "default long text2",
    value: "long text2",
    validation: "[0-9]*",
  },
];

function App() {
  const [result, setResult] = useState("");

  useEffect(() => {
    data.forEach((item) => {
      if (item.type === "longtext") {
        const input = document.getElementsByName(item.name)[0];
        input.addEventListener("input", () => input.setCustomValidity(""));
      }
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    data.forEach((item) => {
      if (item.type === "longtext") {
        let isValid;
        const regex = new RegExp("^" + item.validation + "$");
        isValid = regex.test(formJson[item.name]);
        const input = document.getElementsByName(item.name)[0];
        if (!isValid) {
          input.setCustomValidity("invalid ");
        } else {
          input.setCustomValidity("");
        }
        input.reportValidity();
      }
    });

    const formInp = document.querySelector("form");

    if (formInp.checkValidity()) {
      setResult(formJson);
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {data.map((item) => (
          <div key={item.name}>
            {item.type === "text" && (
              <>
                {item.name}
                <input
                  name={item.name}
                  type="text"
                  pattern={item.validation}
                  defaultValue={item.value ?? item.default_value}
                />
              </>
            )}
            {item.type === "number" && (
              <>
                {item.name}
                <input
                  name={item.name}
                  type="number"
                  defaultValue={item.value ?? item.default_value}
                  min={item.min_value}
                  max={item.max_value}
                />
              </>
            )}
            {item.type === "dropdown" && (
              <>
                {item.name}
                <select
                  name={item.name}
                  defaultValue={item.value || item.default_value}
                >
                  {item.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </>
            )}
            {item.type === "longtext" && (
              <>
                {item.name}

                <textarea name={item.name} pattern={item.validation}>
                  {item.value ?? item.default_value}
                </textarea>
              </>
            )}
          </div>
        ))}
        <button type="submit">Submit form</button>
      </form>

      <br />
      {Object.keys(result).map((item) => (
        <p key={item}>
          <strong>{item} </strong>: {result[item]}
        </p>
      ))}
    </div>
  );
}

export default App;
