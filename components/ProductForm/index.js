import { useState } from "react";
import { StyledForm, StyledHeading, StyledLabel } from "./ProductForm.styled";
import { StyledButton } from "../Button/Button.styled";

const currencies = ["EUR", "USD", "GBP"];
export default function ProductForm({
  onSubmit,
  isEditMode,
  value = {
    name: "",
    price: "",
    currency: "",
    description: "",
  },
}) {
  const [fish, setFish] = useState(value);
  async function handleSubmit(event) {
    onSubmit(event);
  }

  return (
    <StyledForm onSubmit={(event) => handleSubmit(event)}>
      <StyledHeading>
        {isEditMode ? `Edit ${fish.name}` : "Add new fish"}
      </StyledHeading>
      <StyledLabel htmlFor="name">
        Name:
        <input
          type="text"
          id="name"
          name="name"
          value={fish.name}
          onChange={(event) => {
            setFish((fish) => ({ ...fish, name: event.target.value }));
          }}
        />
      </StyledLabel>
      <StyledLabel htmlFor="description">
        Description:
        <input
          type="text"
          id="description"
          name="description"
          value={fish.description}
          onChange={(event) => {
            setFish((fish) => ({ ...fish, description: event.target.value }));
          }}
        />
      </StyledLabel>
      <StyledLabel htmlFor="price">
        Price:
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          value={fish.price}
          onChange={(event) => {
            setFish((fish) => ({ ...fish, price: event.target.value }));
          }}
        />
      </StyledLabel>
      <StyledLabel htmlFor="currency">
        Currency:
        <select
          id="currency"
          name="currency"
          value={fish.currency}
          onChange={(event) => {
            console.log(currencies[event.target.selectedIndex]);
            setFish((fish) => ({
              ...fish,
              currency: currencies[event.target.selectedIndex],
            }));
          }}
        >
          {currencies.map((currency) => {
            return <option key={currency}>{currency}</option>;
          })}
        </select>
      </StyledLabel>
      <StyledButton type="submit">
        {isEditMode ? "Save Fish" : "Add Fish"}
      </StyledButton>
    </StyledForm>
  );
}
