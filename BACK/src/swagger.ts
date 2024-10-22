import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Labyrinth API",
            version: "1.0.0",
            description: "API pour gérer le labyrinthe avec des marques et des pièges",
            contact: {
                name: "Ton Nom",
                email: "ton.email@example.com"
            },
            servers: [
                {
                    url: "http://localhost:3000",
                    description: "Serveur de développement"
                }
            ]
        }
    },
    apis: ["./src/routes/*.ts"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app: any) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    console.log("Swagger docs are available at /api-docs");
};
