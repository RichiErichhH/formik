import React, { useEffect, useState } from 'react';
import { db } from './Firbaseconfig';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export default function Product() {
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');
  const [pro, setProducts] = useState([]);

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

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      addDoc(collection(db, 'products'), {
        id: uuidv4(),
        productName: text,
        pricce: price,
      });
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
          <div className='grid p-1 w-fit bg-[#E4DCCF] rounded m-1 place-content-center shadow-md'>
            <input
              type='text'
              placeholder='enter product name'
              className='p-1 m-2 border-1 rounded'
              onChange={(e) => setText(e.target.value)}
            />

            <input
              type='text'
              placeholder='enter product price'
              className='p-1 m-2 border-1 rounded'
              onChange={(e) => setPrice(e.target.value)}
            />

            <button
              type='submit'
              className='flex border-2 m-2 rounded p-1 bg-[#9D5353] hover:bg-[#632626] border-black border-solid '
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div className='flex items-center justify-center'>
      <table className='table-fixed border-2 border-collapse  border-black w-6/12'>
        <thead>
            <tr className='place-content-center'>
                <th className='border-1 border-solid border-[#9D5353] p-2 text-left bg-[#E4DCCF]'>Product Name</th>
                <th className='border-1 border-solid border-[#9D5353] p-2 text-left bg-[#E4DCCF]'>Price</th>
            </tr>
            <hr className='border-1'></hr>
        </thead>
        <tbody>
        
            {pro.map((product) => (
          
           <tr className=''>
              <td className='border-1 border-solid border-[#9D5353] p-2 text-left'> {product.productName}</td>
              <td className='border-1 border-solid border-[#9D5353] p-2 text-left'> {product.pricce}</td>
            
            </tr>
            ))}
        
        </tbody>
      </table>
      </div>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </div>
  );
}
