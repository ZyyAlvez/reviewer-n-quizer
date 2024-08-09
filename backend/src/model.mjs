import { GoogleGenerativeAI, FunctionDeclarationSchemaType  } from "@google/generative-ai";
import dotenv from "dotenv"

dotenv.config()
const API_KEY = process.env.API_KEY;
const QUERY = process.env.QUERY
const genAI = new GoogleGenerativeAI(API_KEY);

export const reviewerController = async (req, res) => {
  try{
    let model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: FunctionDeclarationSchemaType.ARRAY,
          items: [
            {
              type: FunctionDeclarationSchemaType.OBJECT,
              properties: {
                question: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                answer: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
              },
            },
            {
              type: FunctionDeclarationSchemaType.OBJECT,
              properties: {
                question: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                answer: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
              },
            },
            {
              type: FunctionDeclarationSchemaType.OBJECT,
              properties: {
                question: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                choices: {
                  type: FunctionDeclarationSchemaType.ARRAY,
                  items: {
                    type: FunctionDeclarationSchemaType.STRING,
                  },
                },
              },
            },
          ],
        },
      },
    });
  
      const prompt = `${req.body.prompt}\n\n`
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const jsonFormat = response.text();
      res.status(200).send(jsonFormat)
  }catch(error){
    console.log("flash card error: ", error)
    res.status(400).send({message: error.message})
  }
}
