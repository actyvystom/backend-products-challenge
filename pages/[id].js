import Product from "../components/product";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

export default function ProductDetailsPage() {
  const router = useRouter();
  const {
    query: { id },
    push,
  } = router;
  const { trigger, isMutating } = useSWRMutation(
    `/api/products/${id}`,
    updateProduct
  );
  async function updateProduct(url, { arg }) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  async function handleEditProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const fishData = Object.fromEntries(formData);
    console.log(fishData);
    await trigger(fishData);
    push("/");
  }

  if (isMutating) {
    return <h1>Updating data...</h1>;
  }
  return (
    <>
      <Product onSubmit={handleEditProduct} />
    </>
  );
}
