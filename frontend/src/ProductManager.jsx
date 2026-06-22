import { useEffect, useState } from "react";
import axios from "axios";


function ProductManager() {


  const [products, setProducts] = useState([]);


  const [product, setProduct] = useState({
    name: "",
    price: ""
  });


  const [editId, setEditId] = useState(null);



  // READ PRODUCTS

  const getProducts = async () => {

    const res = await axios.get(
      "http://localhost:5000/products"
    );

    setProducts(res.data);

  };



  useEffect(() => {

    getProducts();

  }, []);





  // ADD + UPDATE PRODUCT

  const saveProduct = async () => {


    if(editId){


      // UPDATE

      await axios.put(

        `http://localhost:5000/update/${editId}`,

        product

      );


      setEditId(null);


    } 
    else {


      // CREATE

      await axios.post(

        "http://localhost:5000/add",

        product

      );


    }



    setProduct({

      name:"",
      price:""

    });


    getProducts();


  };





  // DELETE PRODUCT

  const deleteProduct = async(id)=>{


    await axios.delete(

      `http://localhost:5000/delete/${id}`

    );


    getProducts();


  };





  // EDIT CLICK

  const editProduct = (item)=>{


    setProduct({

      name:item.name,

      price:item.price

    });


    setEditId(item._id);


  };





  return (

    <div>


      <h1>Product Manager</h1>



      <input

      placeholder="Product Name"

      value={product.name}

      onChange={(e)=>

        setProduct({

          ...product,

          name:e.target.value

        })

      }

      />





      <input

      placeholder="Price"

      value={product.price}

      onChange={(e)=>

        setProduct({

          ...product,

          price:e.target.value

        })

      }

      />





      <button onClick={saveProduct}>


        {editId ? "Update Product" : "Add Product"}


      </button>






      {

        products.map((item)=>(


          <div key={item._id}>


            <h3>

              {item.name}

            </h3>



            <p>

              ${item.price}

            </p>





            <button

            onClick={()=>editProduct(item)}

            >

              Edit

            </button>





            <button

            onClick={()=>deleteProduct(item._id)}

            >

              Delete

            </button>



          </div>


        ))

      }





    </div>

  );

}



export default ProductManager;