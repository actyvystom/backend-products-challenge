import useSWR from "swr";
import { useRouter } from "next/router";
import { StyledButton } from "../Button/Button.styled";
import { ProductCard } from "./Product.styled";
import ProductForm from "../ProductForm";
import Comments from "../Comments";
import { useState } from "react";
export default function Product({ onSubmit }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const {
    query: { id },
    push,
  } = router;

  const { data, isLoading } = useSWR(id ? `/api/products/${id}` : null);

  if (!data) return;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <StyledButton
        onClick={() => {
          setIsEditMode(!isEditMode);
        }}
      >
        <span role="img" aria-label="A pencil">
          ✏️
        </span>
      </StyledButton>
      <ProductCard>
        {isEditMode ? (
          <ProductForm
            onSubmit={onSubmit}
            value={data}
            isEditMode={isEditMode}
          />
        ) : (
          <>
            <h2>{data.name}</h2>
            <p>Description: {data.description}</p>
            <p>
              Price: {data.price} {data.currency}
            </p>
            {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
          </>
        )}
      </ProductCard>
      <StyledButton
        onClick={() => {
          push("/");
        }}
      >
        Show all
      </StyledButton>
    </>
  );
}
