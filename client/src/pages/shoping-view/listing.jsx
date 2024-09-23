import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/components/config";

function ShopingListing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              10 Products
            </span>
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
            <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup className="bg-white rounded-lg shadow-md p-2">
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
      </div>
    </div>
  );
}

export default ShopingListing;
