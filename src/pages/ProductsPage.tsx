import { useEffect, useState } from "react";
import { useProducts } from "@/context/products-context";
import { useQuery } from "@/context/query-context";
import { filterProducts, searchProducts } from "@/lib/helpers";
import Error from "@/containers/global/Error";
import Loader from "@/containers/global/Loader";
import { ProductType } from "@/lib/types";
import { Tabs } from "@/components/ui/tabs";
import List from "@/components/routes/products/List";
import Grid from "@/components/routes/products/Grid";
import TabsSwitch from "@/components/routes/products/Tabs";
import Categories from "@/components/routes/products/Categories";
import Search from "@/components/routes/products/Search";

function ProductsPage() {
  const [displayed, setDisplayed] = useState<ProductType[]>([]);
  const { products, error } = useProducts();
  const { query, initializeQuery } = useQuery();

  useEffect(() => {
    setDisplayed(products);
    initializeQuery();
  }, [products]);

  useEffect(() => {
    // filter products
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  if (error) return <Error message={error} />;

  return (
    <Tabs defaultValue="grid">
      <Search />
      <div className="flex justify-between items-center mt-5 overflow-x-auto">
        <div className="flex items-center gap-10">
          <TabsSwitch />
          <Categories />
        </div>
        <span className="text-sm text-slate-400 hidden md:block">
          {displayed.length} products
        </span>
      </div>
      <Grid products={displayed} />
      <List products={displayed} />
    </Tabs>
  );
}

export default ProductsPage;
