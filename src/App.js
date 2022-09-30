import "./App.css";
import {
  DescriptionList,
  TextField,
  Card,
  TextContainer,
  Heading,
  Button,
  Modal,
} from "@shopify/polaris";
import { useReducer } from "react";

const initialState = {
  title: "",
  description: "",
  category: "",
};
const modalState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "category":
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

const modalReducer = (state = modalState, action) => {
  switch (action.type) {
    case "toggle":
      return !state;
    default:
      return state;
  }
};

function App() {
  const [inputs, dispatch] = useReducer(reducer, initialState);
  const [modal, dispatchModal] = useReducer(modalReducer, modalState);

  console.log(inputs);
  return (
    <div className="App">
      <div className="block">
        <DescriptionList
          items={[
            {
              term: (
                <TextContainer>
                  <Heading>
                    Title<sup> *</sup>
                  </Heading>
                  <p>
                    Mention the title of the product that you want to display to
                    the customers on the Amazon marketplace
                  </p>
                </TextContainer>
              ),

              description: (
                <Card sectioned>
                  <TextField
                    onChange={(e) => dispatch({ type: "title", payload: e })}
                    autoComplete="off"
                    value={inputs.title}
                  />
                </Card>
              ),
            },
            {
              term: (
                <TextContainer>
                  <Heading>
                    Description<sup> *</sup>
                  </Heading>
                  <p>
                    Mention a detailed yet precise product description embedded
                    with 'Keywords' that define the product appropriately.
                  </p>
                </TextContainer>
              ),

              description: (
                <Card sectioned>
                  <TextField
                    value={inputs.description}
                    onChange={(e) =>
                      dispatch({ type: "description", payload: e })
                    }
                    autoComplete="off"
                  />
                </Card>
              ),
            },
            {
              term: (
                <TextContainer>
                  <Heading>
                    Amazon Category<sup> *</sup>
                  </Heading>
                  <p>
                    Set Amazon Category/Browse Node for a product, to set a
                    searchability and browsing hierarchy on Amazon Marketplace.
                  </p>
                </TextContainer>
              ),

              description: (
                <Card sectioned>
                  <TextField
                    value={inputs.category}
                    onChange={(e) => dispatch({ type: "category", payload: e })}
                    autoComplete="off"
                  />
                </Card>
              ),
            },
            {
              term: (
                <Button
                  primary
                  onClick={() => {
                    dispatchModal({ type: "toggle" });
                  }}
                >
                  Submit
                </Button>
              ),
              description: "",
            },
          ]}
        />
        {modal ? 
        <Modal
        open={modal}
        onClose={()=>{dispatchModal({ type: "toggle" })}}>
          <Card title="Filled Entries" sectioned>
          <DescriptionList
          items={[
          {
          term: 'Title',
          description:
            inputs.title,
          },
          {
            term: 'Description',
            description:
            inputs.description,
          },
          {
            term: 'Amazon Category',
            description:
            inputs.category,
          }
        ]} 
          >

          </DescriptionList>
          </Card>
        </Modal>
         : null}
      </div>
    </div>
  );
}

export default App;
