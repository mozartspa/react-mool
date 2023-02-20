import {
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiErrorBoundary,
  EuiLoadingSpinner,
  EuiProvider,
  EuiSuggest,
} from "@elastic/eui"
import "@elastic/eui/dist/eui_theme_light.css"
import { CoreContext } from "@react-mool/core-v2"
import { Layout } from "@react-mool/eui-v2"
import { Suspense, useState } from "react"

const options = [
  {
    label: "Titan",
    "data-test-subj": "titanOption",
  },
  {
    label: "Enceladus",
  },
  {
    label: "Mimas",
  },
  {
    label: "Dione",
  },
  {
    label: "Iapetus",
  },
  {
    label: "Phoebe",
  },
  {
    label: "Rhea",
  },
  {
    label: "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  {
    label: "Tethys",
  },
  {
    label: "Hyperion",
  },
]

const Suggest = () => {
  const [selectedOptions, setSelected] = useState([options[2]])

  const onChange = (selectedOptions: EuiComboBoxOptionOption<unknown>[]) => {
    // We should only get back either 0 or 1 options.
    setSelected(selectedOptions)
  }

  const onCreateOption = (searchValue: string) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase()

    if (!normalizedSearchValue) {
      return
    }

    const newOption = {
      label: searchValue,
    }

    // Select the option.
    setSelected([newOption])
  }

  return (
    <EuiComboBox
      aria-label="Accessible screen reader label"
      placeholder="Select a single option"
      singleSelection={{ asPlainText: true }}
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
      customOptionText="Add {searchValue} as your occupation"
    />
  )
}

function App() {
  return (
    <CoreContext>
      <EuiProvider colorMode="light">
        <EuiErrorBoundary>
          <Layout>
            <Suspense fallback={<EuiLoadingSpinner size="l" />}>
              {/* <ProductList /> */}
              <Suggest />
              <EuiSuggest
                aria-label="suggestions"
                suggestions={[
                  {
                    type: { iconType: "kqlField", color: "tint4" },
                    label: "Field sample",
                  },
                  {
                    type: { iconType: "kqlValue", color: "tint0" },
                    label: "Value sample",
                  },
                  {
                    type: {
                      iconType: "kqlSelector",
                      color: "tint2",
                    },
                    label: "Conjunction sample",
                  },
                  {
                    type: {
                      iconType: "kqlOperand",
                      color: "tint1",
                    },
                    label: "Operator sample",
                  },
                  {
                    type: { iconType: "search", color: "tint8" },
                    label: "Recent search",
                  },
                  {
                    type: { iconType: "save", color: "tint3" },
                    label: "Saved search",
                  },
                ]}
              />
            </Suspense>
          </Layout>
        </EuiErrorBoundary>
      </EuiProvider>
    </CoreContext>
  )
}

export default App
