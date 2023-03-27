import express from "express";

const router = express.Router();

router.get("/" , (req, res)=>{
    console.log("Not found url - " + req.protocol + '://' + req.get('host') + req.originalUrl);
})

export default router;