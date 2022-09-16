import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData, deleteData } from '../../../utilities/HttpMethods';
import classes from './Products.module.css';
import Product from './Product';
import ConfirmModal from '../../../UI/ConfirmModal';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import NoDataFound from '../../../UI/NoDataFound';
import ErrorMessage from '../../../UI/ErrorMessage';
import Loader from '../../../UI/Loader';
import { allProducts } from '../../../JSON/productData';
import { categoryList } from '../../../JSON/categoryData';

function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addProduct, setAddProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [ProductId, setProductId] = useState();
    const [product, setProductData] = useState({});
    const [categories, setCategories] = useState([]);

    const getProducts = async () => {
        try {
          //const response = await getData('/item/findAll');
          const response = allProducts;
          const productData = [];
          for (const item of response.data) {
            productData.push({
              id: item.id,
              image: item.image,
              name: item.name,
              description: item.description,
              price: item.price,
              currency: item.currency,
              itemCategory: item.itemCategory
            });
          }
          setProducts(productData);
          getCategories();
        } 
        catch (error) {
          setIsLoading(false);
          setHttpError(error.message);
        }
    }

    const getCategories = async () => {
        try {
          //const response = await getData('/itemCategory/findAll');
          const response = categoryList;
          const categoryData = [];
          for (const item of response.data) {
            categoryData.push({
              id: item.id,
              image: item.image,
              name: item.name,
              description: item.description
            });
          }
          setCategories(categoryData);
          setIsLoading(false);
        } 
        catch (error) {
          setIsLoading(false);
          setHttpError(error.message);
        }
    }

    useEffect(() => {
        getProducts();
     },[]);

    if (isLoading) {
        return (
          <Loader />
        );
    }
    
    if (httpError) {
        return (
         <ErrorMessage/>
        );
    }

    const base64Encoded = (file) => {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const closeModal = () => {
      setAddProduct(false);
      setEditProduct(false);
      setDeleteModalOpen(false);
    }

    const openEditProduct = (id) => {
      setProductId(id);
      const productData = products.filter(b => b.id === id);
      setProductData(productData[0]);
      setEditProduct(true);
    }

    const onEditProduct = (formData) => {
      let updatedData = {};
      for (const [key, value] of formData) {
        updatedData[`${key}`] = value;
      }
      (async (updatedProduct) => {
        setEditProduct(false);
        try {
          if(typeof(updatedProduct.image) === 'object'){
            const encodedFile = await base64Encoded(updatedProduct.image);
            updatedProduct.image = encodedFile;
          }
          updatedProduct.id = ProductId;
          //await postData('/item/updateItem', updatedProduct);
          const editedProduct = products.find(b => b.id === ProductId);
          Object.assign(editedProduct, updatedProduct);
          toast.warn('Product updated successfully');
        } 
        catch (err) {
          setHttpError(err.error);
        }
      })(updatedData);
    }
    
    const openDeleteProduct = (id) => {
      setProductId(id);
      setDeleteModalOpen(true);
    }
    
    const onDeleteProduct = async () => {
      setDeleteModalOpen(false);
      try {
        //await deleteData(`/item/deleteItem/${ProductId}`);
        const productData = products.filter(b => b.id !== ProductId);
        setProducts(productData);
        toast.error('Product deleted successfully');
      }
      catch (err){
        setHttpError(err.error);
      }
    }

    const openAddProduct = () => {
      setAddProduct(true);
    }

    const onAddProduct = (formData) => {
      let newProduct = {} ;
      for (const [key, value] of formData) {
        newProduct[`${key}`] = value;
      }
      (async (productData) => {
        setAddProduct(false);
          try {
            const encodedFile = await base64Encoded(productData.image);
            productData.image = encodedFile;
            //const response = await postData('/item/createItem', productData);
            //productData.id = response.data.id;
            productData.id = Math.floor(Math.random() * 100);
            products.push(productData);
            setProducts(products);
            toast.success('New Product added successfully');
          } 
          catch (err) {
            setHttpError(err.error);
          }
      })(newProduct);
    }
    
    const productList = products.map((product) => (
      <Product
        key={product.id}
        id={product.id}
        name={product.name}
        description={product.description}
        price={product.price}
        currency={product.currency}
        image={product.image}
        itemCategory={product.itemCategory}
        categories={categories}
        onEdit={openEditProduct}
        onDelete={openDeleteProduct}
      />
    ));

    return (
        <div className={`clearfix ${classes['section-wrap']}`}>
            <button className='float-end' onClick={openAddProduct}><FaPlus />&nbsp;&nbsp;Add Product</button>
            { addProduct && <AddProduct categories={categories} onCancel={closeModal} onConfirm={onAddProduct} /> }
            <ul className='row'>
              { productList }
              { products.length < 1 && <NoDataFound/> }
            </ul>
            { editProduct && <EditProduct categories={categories} onCancel={closeModal} onConfirm={onEditProduct} productData={product} /> }
            { isDeleteModalOpen && 
              <ConfirmModal 
                onCancel={closeModal} 
                onConfirm={onDeleteProduct} 
                title='Are you sure you want to delete this product?'/> 
            }
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover
              theme="colored"
            />
        </div>
    )
}

export default Products;