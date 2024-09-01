import { Option, Select } from "./components/Select";

const options: Option[] = [
  { value: "1", label: "Item 1", icon: "./smile.gif" },
  { value: "2", label: "Item 2", icon: "./smile.gif" },
  { value: "3", label: "Item 3", icon: "./smile.gif" },
  { value: "4", label: "Item 4", icon: "./smile.gif" },
  { value: "5", label: "Item 5", icon: "./smile.gif" },
];

function App() {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          alignItems: "center",
        }}
      >
        <h1>Select single</h1>
        <Select options={options} />
        <h1>Select multiple</h1>
        <Select options={options} multiple />
        <h1>Select disabled</h1>
        <Select options={options} disabled />
        <h1>Select single combobox</h1>
        <Select options={options} combobox />
        <h1>Select multiple combobox</h1>
        <Select options={options} multiple combobox />
        <h1>Select with custom labels</h1>
        <Select
          options={options}
          customLabel={(option) => (
            <>
              <img src={option.icon} />
              <span>{option.label}</span>
            </>
          )}
        />
        <h1>Select with custom dropdown</h1>
        <Select
          options={options}
          customDropdown={(list) => (
            <div>
              <p>My custom dropdown</p>
              {list}
            </div>
          )}
        />
        <h1>Select with handle changes</h1>
        <Select
          options={options}
          handleChange={(state) => console.log(state)}
        />
      </div>
    </>
  );
}

export default App;
