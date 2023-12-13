import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from 'components/Loading';

const Product = lazy(() => import(`./product`));
const Create = lazy(() => import(`./product/create`));
const Update = lazy(() => import(`./product/update`));

export const ProductViews = () => {
  return (
    <div className="bg-background">
      <Suspense fallback={<Loading cover="page"/>}>
        <Routes>
          <Route path="/" element={<Product title="Products"/>} />
          <Route path="/:id" element={<Update title="Update Product"/>} />
          <Route path="/create" element={<Create title="Create Product"/>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default ProductViews;

