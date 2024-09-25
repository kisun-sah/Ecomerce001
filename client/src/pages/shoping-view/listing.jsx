/* eslint-disable react/jsx-key */
import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/components/config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";








function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

function ShopingListing() {

  const dispatch = useDispatch();
  const {productList} = useSelector(state => state.shopProducts);
  const [filters , setFilters] = useState({});
  const [sort , setSort] = useState(null)
  const [searchParams , setSearchParams] = useSearchParams();

 


function handleSort(value) {
  console.log(value);
  
  setSort(value);
}

function handleFilter(getSectionId, getCurrentOption) {
  console.log(getSectionId, getCurrentOption);
  
  let cpyFilters = { ...filters };
  const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

  if (indexOfCurrentSection === -1) {
    cpyFilters = {
      ...cpyFilters,
      [getSectionId]: [getCurrentOption],
    };
  } else {
    const indexOfCurrentOption =
      cpyFilters[getSectionId].indexOf(getCurrentOption);

    if (indexOfCurrentOption === -1)
      cpyFilters[getSectionId].push(getCurrentOption);
    else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
  }

  setFilters(cpyFilters);
  sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
}

useEffect(() => {
  setSort("price-lowtohigh");
  setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
}, []);

useEffect(() => {
  if (filters && Object.keys(filters).length > 0) {
    const createQueryString = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(createQueryString));
  }
}, [filters]);

  
  //feach list of producs 
  useEffect(() => {
    dispatch(fetchAllFilteredProducts()); // Invoke fetchAllFilteredProducts as a function
  }, [dispatch]);
  
console.log(filters ,searchParams);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
      <ProductFilter filters={filters} handleFilter={handleFilter}/>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList?.length}</span>
            <DropdownMenu>
  <DropdownMenuTrigger>
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-1"
    >
      <ArrowUpDownIcon className="h-4 w-4" />
      <span>Sort by</span>
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent 
    align="end" 
    className="w-[200px] z-50" // Added z-index to ensure visibility
    style={{ overflow: 'visible' }} // Ensure no overflow restrictions
  >
    <DropdownMenuRadioGroup 
      className="bg-white rounded-lg shadow-md p-2" 
      value={sort} 
      onValueChange={handleSort}
    >
      {sortOptions.map((sortItem) => (
        <DropdownMenuRadioItem
          value={sortItem.id}
          key={sortItem.id}
          className="flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-gray-100"
        >
          {sortItem.label}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>

          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {productList && productList.length > 0
            ? productList.map(productItem => 
                <ShoppingProductTile product={productItem}/>
              )
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShopingListing;
