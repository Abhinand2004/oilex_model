import userSchema from "./models/user.js"
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
import productSchema from "./models/products.js"
import buyerSchema from "./models/tobuy.js"
const { sign } = pkg



const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // secure: false, // true for port 465, false for other ports
    auth: {
        user: "abhinandc293@gmail.com",
        pass: "xfrk uoxu ipfs lhjj",
    },
});

export async function register(req, res) {
    // console.log(req.body);
    const { username, email, pwd, cpwd,phone,address,city,pincode ,district,images} = req.body
    const user = await userSchema.findOne({ email })
    if (!user) {
        if (!(username && email && pwd && cpwd))
            return res.status(500).send({ msg: "fields are empty" })
        if (pwd != cpwd)
            return res.status(500).send({ msg: "pass not match" })
        bcrypt.hash(pwd, 10).then((hpwd) => {
            userSchema.create({ username, email,phone,address,city,pincode ,district, pass: hpwd ,images})
            res.status(200).send({ msg: "Successfull" })
        }).catch((error) => {
            console.log(error);
        })
    } else {
        res.status(200).send({ msg: "email already used " })
    }
}

export async function verifyEmail(req, res) {
    const { email } = req.body
    console.log(email);
    if (!(email)) {
        return res.status(500).send({ msg: "fields are empty" })
    }
    const user = await userSchema.findOne({ email })
    if (!user) {
        const info = await transporter.sendMail({
            from: 'abhinandc293@gmail.com', // sender address
            to: email, // list of receivers
            subject: "verify", // Subject line
            text: "VERIFY! your email", // plain text body
            html: `
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <div style="max-width: 500px; margin: 0 auto; padding: 20px; background-color: #f0fdf8; border: 2px solid #6bd7a8; border-radius: 12px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; text-align: center;">
        <h2 style="color: #6bd7a8;">Email Verification</h2>
        <p style="color: #333;">Click the button below to verify it's you</p>
        <a href="http://localhost:5173/register" style="text-decoration: none;">
            <button style="padding: 10px 20px; border: none; border-radius: 8px; background-color: #6bd7a8; color: white; font-size: 16px; cursor: pointer;">
                Verify
            </button>
        </a>
    </div>
</body>
`,
        })
        console.log("Message sent: %s", info.messageId)
        res.status(200).send({ msg: "Verificaton email sented" })
    } else {
        return res.status(500).send({ msg: "email already exist" })
    }
}

export async function login(req, res) {
    // console.log(req.body);
    const { email, pass } = req.body
    if (!(email && pass))
        return res.status(500).send({ msg: "fields are empty" })
    const user = await userSchema.findOne({ email })
    if (!user)
        return res.status(500).send({ msg: "email donot exist" })
    const success = await bcrypt.compare(pass, user.pass)
    // console.log(success);
    if (success !== true)
        return res.status(500).send({ msg: "email or password not exist" })
    const token = await sign({ UserID: user._id }, process.env.JWT_KEY, { expiresIn: "24h" })
    // console.log(token);
    res.status(200).send({ token })
}





export async function createProductDetails(req, res) {
    const { ...data } = req.body;
    console.log(data);
    try {
        const user_id = await userSchema.findOne({ _id: req.user.UserID });
        if (!user_id) {
            return res.status(500).send({ msg: "User does not exist" });
        }
        data.username=user_id.username
        data.user_id=req.user.UserID
        const post = await productSchema.create(data);
        console.log(post);

        res.status(200).send({ msg: "Product created successfully"});
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send({ msg: "An error occurred while creating the product"});
    }
}


export async function userDataDisplay(req,res) {
    const user_id = await userSchema.findOne({ _id: req.user.UserID });
if (user_id) {
    return res.status(200).send({user_id})
}
    return res.status(500).send({msg:"user dont find"})
}


export async function productData(req,res) {
    const userdata = await productSchema.find({ user_id: req.user.UserID });
if (userdata) {
    return res.status(200).send({userdata})
}
    return res.status(500).send({msg:"user dont find"})
}


export async function prductDetailspage(req,res) {
    const {id}=req.params
    // console.log(id);
    const userdata = await productSchema.findOne({ _id:id });
if (userdata) {
    return res.status(200).send({userdata})
}
    return res.status(500).send({msg:"user dont find"})
}


export async function deleteproduct(req,res) {
    const {id}=req.params
    // console.log(id);
    const userdata = await productSchema.deleteOne({ _id:id });
if (userdata) {
    return res.status(200).send({userdata})
}
    return res.status(500).send({msg:"user dont find"})
}


export async function updateproduct(req, res) {
    const { id } = req.params; 
    const { ...data } = req.body; 
    try {
        const user = await userSchema.findOne({ _id: req.user.UserID });
        if (!user) {
            return res.status(404).send({ msg: "User does not exist" });
        }
        data.username = user.username;
        data.user_id = req.user.UserID;
        const result = await productSchema.updateOne( { _id: id }, { $set: data } );
        if (result) {
            return res.status(200).send({ msg: "Product updated successfully" });
        } else {
            return res.status(500).send({ msg: "enter all datas" });
        }
    } catch (error) {
        
        res.status(500).send({ msg: "An error occurred while updating the product"});
    }
}


export async function displaytohomepage(req,res) {
   try {
    const data= await productSchema.find({user_id:{$ne:req.user.UserID}})  
    if (!data) {
        return res.status(500).send({msg:"datas are empty"})
    }
    return res.status(200).send({data})
} catch{

    return res.status(500).send({msg:"cant fetch data"})
}}


export async function deleteAccount(req, res) {
    try {
      const user = await userSchema.findOne({ _id: req.user.UserID });
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
  
      const posts = await productSchema.find({ user_id: req.user.UserID });
      if (posts.length > 0) {
        await productSchema.deleteMany({ user_id: req.user.UserID });
      }
  
      const delUser = await userSchema.deleteOne({ _id: req.user.UserID });
      if (delUser) {
        return res.status(200).send({ msg: "User and associated posts deleted successfully" });
      } else {
        return res.status(500).send({ msg: "Failed to delete user" });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      res.status(500).send({ msg: "An error occurred while deleting the account" });
    }
  }
  




  export async function messagedeails(req, res) {
    const { ...data } = req.body;
    const {id}=req.params
    data.post_id = id
  console.log(data);
  
    try {
      const user = await userSchema.findOne({ _id: req.user.UserID });
      if (!user) {
        return res.status(404).send({ msg: "User does not exist" });
      }
  
      const postdata = await productSchema.findOne({ _id: id });
      if (!postdata) {
        return res.status(404).send({ msg: "Product does not exist" });
      }
      data.seller_id = postdata.user_id;
      data.productName = postdata.productName;
      data.category = postdata.category;
      data.buyername = user.username; 
      data.buyer_id = req.user.UserID;
  

      const message = await buyerSchema.create(data);
      console.log("Message created:", message);
  
      res.status(200).send({ msg: "Message created successfully" });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).send({ msg: "An error occurred while creating the message" });
    }
  }



  export async function notificationdetails(req,res) {
 const message= await buyerSchema.find({seller_id:req.user.UserID})
 if (!message) {
    return res.status(500).send({msg:",no messages found"})
 }
    return res.status(200).send({message})
  }