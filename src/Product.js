import React, { useEffect, useState } from 'react';
import { db } from './Firbaseconfig';
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const centerTableStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

export default function Product() {
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');
  const [pro, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const[newPrice,setNewPrice] = useState('');

  const openUpdateView = (productId) => {
    setOpenUpdate(true);
    setSelectedProductId(productId);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const handleEdit = async () => {
    try {
      const postDoc = doc(db, 'products', selectedProductId);
      await updateDoc(postDoc, { productName: newProduct , pricce : newPrice});
      setOpenUpdate(false);
      setNewProduct('');
      setNewPrice('');
    } catch (error) {
      toast.error("Error Updating Data: " + error.message);
    }
  };

  const handleProductChange = (e) => {
    setNewProduct(e.target.value);
  };
  const handlePriceChange = (e) =>{
    setNewPrice(e.target.value);
  }

  const handleEditChange = () => {
    setOpenUpdate(false);
 };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const productData = collection(db, 'products');

    const datas = onSnapshot(productData, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    });
    return datas;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      addDoc(collection(db, 'products'), {
        uid: uuidv4(),
        productName: text,
        pricce: price,
      });
      setText('');
      setPrice('');
      toast.success('Successfully added');
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <div className='grid h-screen '>
      <div className='grid justify-center'>
        <form>
          <h1 className='text-3xl font-bold '> Add Product</h1>
          <div className='grid p-1 w-screen  rounded  place-content-center shadow-md'>
            <input
              type='text'
              placeholder='enter product name'
              className='p-1 m-2 border-1 w-full rounded'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type='text'
              placeholder='enter product price'
              className='p-1 m-2 border-1 w-full rounded'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button
              type='submit'
              className='flex border-2 m-2 rounded p-1 w-full bg-black hover:bg-[#A9A9A9] border-black border-solid text-white'
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div className='flex items-center justify-center mb-20'>
        <TableContainer sx={centerTableStyles}>
          <Table sx={{ width: 500 }} aria-label='simple table'>
            <TableHead>
              <TableRow className='place-content-center'>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pro.map((product) => (
                <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>{product.productName}</StyledTableCell>
                  <StyledTableCell>{product.pricce}</StyledTableCell>
                  <StyledTableCell>
                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <button onClick={() => openUpdateView(product.id)}>Edit</button>
                   
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {openUpdate &&  (
      <Dialog
        open={openUpdate}
        onClose={handleEditChange}
      >
      <DialogTitle>{"Updated Data"}</DialogTitle>
      <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        <input
                          type='text'
                          value={newProduct}
                          onChange={handleProductChange}
                          placeholder='update product'
                        />
                        <input
                          type='text'
                          value={newPrice}
                          onChange={handlePriceChange}
                          placeholder='update price'
                        />
                        <button onClick={handleEdit}>Update</button>
                        <button onClick={handleEditChange}>Cancel</button>
                      </DialogContentText>
            </DialogContent>
          </Dialog>
                    ) }
    </div>
  );
}
