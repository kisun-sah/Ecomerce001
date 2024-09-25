/* eslint-disable react/prop-types */

import { filterOptions } from "@/components/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-extrabold text-black">Filters</h2>
      </div>
      <div className="p-4 space-y-6">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold text-black">{keyItem}</h3>
              <div className="grid gap-3 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
                  >
                    <Checkbox
                       checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="h-4 w-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-black">{option.label}</span>
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="border-gray-200 my-4" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
