"use client";

import { useApiMutation, useApiQuery } from "@hooks/use-queries";
import React, { useMemo, useState } from "react";

interface Product {
  id: string;
  perfumeName: string;
  price: number;
  perfumeDescription: string;
  gender: boolean;
  image: string;
  company: string;
}

const PRODUCTS_URL = "https://6788ebf62c874e66b7d6e02d.mockapi.io/products";

export default function TestProductsPage() {
  const [form, setForm] = useState({
    perfumeName: "",
    price: "",
    perfumeDescription: "",
    gender: "male",
    image: "",
    company: "",
  });

  const productsQueryKey = useMemo(() => ["products", "mockapi"] as const, []);

  const { data, isLoading, error, refetch, isFetching } = useApiQuery<
    Product[]
  >(
    productsQueryKey,
    async () => {
      const res = await fetch(PRODUCTS_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch products");
      return (await res.json()) as Product[];
    },
    {
      staleTime: 60_000,
      // Keep unused query data in cache for 10 minutes (React Query v5)
      gcTime: 10 * 60_000,
    }
  );

  const createProduct = useApiMutation<Product, Partial<Product>>(
    async (payload) => {
      const res = await fetch(PRODUCTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create product");
      return (await res.json()) as Product;
    },
    {
      successMessage: "Product created",
      errorMessage: "Could not create product",
      invalidateQueries: [productsQueryKey],
    }
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.perfumeName || !form.price) return;
    const priceNumber = Number(form.price);
    await createProduct.mutateAsync({
      perfumeName: form.perfumeName,
      price: Number.isFinite(priceNumber) ? priceNumber : 0,
      perfumeDescription: form.perfumeDescription || "",
      gender: form.gender === "male",
      image: form.image || "https://via.placeholder.com/400x300?text=Perfume",
      company: form.company || "Unknown",
    });
    setForm({
      perfumeName: "",
      price: "",
      perfumeDescription: "",
      gender: "male",
      image: "",
      company: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Mock Products</h1>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
        >
          {isFetching ? "Refreshing..." : "Refetch"}
        </button>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && (
        <div className="p-3 rounded bg-red-100 text-red-700">
          {String((error as any)?.message || error)}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded border"
      >
        <input
          className="border rounded px-3 py-2"
          placeholder="Name"
          value={form.perfumeName}
          onChange={(e) =>
            setForm((f) => ({ ...f, perfumeName: e.target.value }))
          }
          required
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="Price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          required
        />
        <input
          className="border rounded px-3 py-2 sm:col-span-2"
          placeholder="Description"
          value={form.perfumeDescription}
          onChange={(e) =>
            setForm((f) => ({ ...f, perfumeDescription: e.target.value }))
          }
        />
        <select
          className="border rounded px-3 py-2"
          value={form.gender}
          onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          className="border rounded px-3 py-2"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
        />
        <input
          className="border rounded px-3 py-2 sm:col-span-2"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
        />
        <button
          type="submit"
          disabled={createProduct.isPending}
          className="px-3 py-2 rounded bg-green-600 text-white disabled:opacity-60"
        >
          {createProduct.isPending ? "Creating..." : "Create"}
        </button>
      </form>

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((p) => (
            <div key={p.id} className="border rounded-lg p-4 bg-white">
              <img
                src={p.image}
                alt={p.perfumeName}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <div className="font-semibold">{p.perfumeName}</div>
              <div className="text-sm text-gray-600">{p.company}</div>
              <div className="mt-2 font-medium">${p.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
