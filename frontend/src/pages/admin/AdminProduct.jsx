import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card } from "@/components/ui/card";
import { Edit, Search, Trash2 } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import ImageUpload from "@/components/ImageUpload";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { setProducts } from "@/redux/productSlice";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const [editProduct, setEditProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  let filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice
    );
  }
  if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice
    );
  }

  /* ================= HANDLE INPUT CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= HANDLE SAVE ================= */

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editProduct) return;

    const formData = new FormData();
    formData.append("productName", editProduct.productName);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("category", editProduct.category);
    formData.append("brand", editProduct.brand);

    const existingImages = editProduct.productImg
      ?.filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    editProduct.productImg
      ?.filter((img) => img instanceof File)
      .forEach((file) => formData.append("files", file));

    try {
      const res = await axios.put(
        `https://eco-mart-r73h.onrender.com/api/v1/product/update/${editProduct._id}`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");
        const updatedProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p
        );
        dispatch(setProducts(updatedProducts));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  /* ================= HANDLE DELETE ================= */

  const deleteProductHandler = async (productId) => {
    try {
      const remainingProducts = products.filter((p) => p._id !== productId);
      const res = await axios.delete(
        `https://eco-mart-r73h.onrender.com/api/v1/product/delete/${productId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(remainingProducts));
      }
    } catch (e) {
      console.log(e);
    }
  };

  /* ================= UI ================= */

  return (
    // ✅ FIXED: removed large pl, use w-full so content fills the remaining space
    <div className="flex-1 py-8 px-8 flex flex-col gap-3 min-h-screen bg-gray-100 w-full">

      {/* ================= TOP BAR ================= */}

      <div className="flex justify-between items-center">
        <div className="relative bg-white rounded-lg">
          <Input
            type="text"
            placeholder="Search Product..."
            className="w-[300px] pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 text-gray-500 w-4 h-4" />
        </div>

        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="highToLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ================= PRODUCT LIST ================= */}

      {filteredProducts.map((product, index) => (
        <Card key={index} className="px-4">
          <div className="flex items-center justify-between">

            {/* LEFT */}
            <div className="flex gap-2 items-center">
              <img
                src={product.productImg?.[0]?.url}
                alt=""
                className="w-20 h-20 object-cover"
              />
              <h1 className="font-bold w-64 text-gray-700">
                {product.productName}
              </h1>
            </div>

            {/* PRICE */}
            <h1 className="font-semibold text-gray-800">
              ₹{product.productPrice}
            </h1>

            {/* ACTIONS */}
            <div className="flex gap-3 items-center">

              {/* ================= EDIT ================= */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOpen(true);
                      setEditProduct({ ...product });
                    }}
                  >
                    <Edit className="text-green-500" />
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll">
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                      Make changes to your product here.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-3">
                    <div className="grid gap-2">
                      <Label>Product Name</Label>
                      <Input
                        type="text"
                        name="productName"
                        value={editProduct?.productName || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Price</Label>
                      <Input
                        type="number"
                        name="productPrice"
                        value={editProduct?.productPrice || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Brand</Label>
                        <Input
                          type="text"
                          name="brand"
                          value={editProduct?.brand || ""}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Category</Label>
                        <Input
                          type="text"
                          name="category"
                          value={editProduct?.category || ""}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label>Description</Label>
                      <Textarea
                        name="productDesc"
                        value={editProduct?.productDesc || ""}
                        onChange={handleChange}
                      />
                    </div>

                    {editProduct && (
                      <ImageUpload
                        productData={editProduct}
                        setProductData={setEditProduct}
                      />
                    )}
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* ================= DELETE ================= */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Trash2 className="text-red-500 cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this product from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminProduct;