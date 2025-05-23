import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  "openapi": "3.0.4",
  "info": {
    "title": "API do Gestor Financeiro Pessoal",
    "version": "1.0.0",
    "description": "API para gerenciamento financeiro pessoal desenvolvida no curso Técnico de Desenvolvimento de Sistemas do SENAI"
  },
  "servers": [
    {
      "url": "http://localhost:3000/",
      "description": "Servidor Local"
    },
    {
      "url": "https://192.168.0.237:3000",
      "description": "Servidor de API do Douglas"
    }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "paths": {
    "/usuarios": {
      "post": {
        "tags": [
          "Usuários"
        ],
        "summary": "Cadastrar novo usuário",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "get": {
        "tags": [
          "Usuários"
        ],
        "summary": "Listar todos os usuários",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      }
    },
    "/usuarios/login": {
      "post": {
        "tags": [
          "Usuários"
        ],
        "summary": "Login do usuário",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/usuarios/{id_usuario}": {
      "delete": {
        "tags": [
          "Usuários"
        ],
        "summary": "Desativar usuário",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id_usuario",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/usuarios/{id}": {
      "patch": {
        "tags": [
          "Usuários"
        ],
        "summary": "Atualizar parcialmente o usuário",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "put": {
        "tags": [
          "Usuários"
        ],
        "summary": "Atualizar todos os campos do usuário",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/categorias": {
      "post": {
        "tags": [
          "Categorias"
        ],
        "summary": "Cadastrar nova categoria",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      },
      "get": {
        "tags": [
          "Categorias"
        ],
        "summary": "Listar categorias",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      }
    },
    "/categorias/filtrarCategoria": {
      "get": {
        "tags": [
          "Categorias"
        ],
        "summary": "Filtrar categorias",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/categorias/{id}": {
      "put": {
        "tags": [
          "Categorias"
        ],
        "summary": "Atualizar categoria",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "delete": {
        "tags": [
          "Categorias"
        ],
        "summary": "Deletar categoria",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "patch": {
        "tags": [
          "Categorias"
        ],
        "summary": "Editar categoria",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/subcategorias": {
      "post": {
        "tags": [
          "Subcategorias"
        ],
        "summary": "Cadastrar nova subcategoria",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "get": {
        "tags": [
          "Subcategorias"
        ],
        "summary": "Listar subcategorias",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      }
    },
    "/subcategorias/{id}": {
      "put": {
        "tags": [
          "Subcategorias"
        ],
        "summary": "Atualizar subcategoria",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "delete": {
        "tags": [
          "Subcategorias"
        ],
        "summary": "Deletar subcategoria",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "patch": {
        "tags": [
          "Subcategorias"
        ],
        "summary": "Editar subcategoria",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/contas": {
      "post": {
        "tags": [
          "Contas"
        ],
        "summary": "Criar nova conta",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "get": {
        "tags": [
          "Contas"
        ],
        "summary": "Listar contas",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/contas/filtrarContas": {
      "get": {
        "tags": [
          "Contas"
        ],
        "summary": "Filtrar contas",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      }
    },
    "/contas/{id_conta}": {
      "put": {
        "tags": [
          "Contas"
        ],
        "summary": "Atualizar conta",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "parameters": [
          {
            "name": "id_conta",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "patch": {
        "tags": [
          "Contas"
        ],
        "summary": "Editar conta",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "parameters": [
          {
            "name": "id_conta",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/contas/{id}": {
      "delete": {
        "tags": [
          "Contas"
        ],
        "summary": "Deletar conta",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/transacao": {
      "post": {
        "tags": [
          "Transações"
        ],
        "summary": "Nova transação",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "get": {
        "tags": [
          "Transações"
        ],
        "summary": "Listar transações",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      }
    },
    "/transacao/filtroData": {
      "get": {
        "tags": [
          "Transações"
        ],
        "summary": "Filtrar por data",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/transacao/transacoesVencidas/{id_usuario}": {
      "get": {
        "tags": [
          "Transações"
        ],
        "summary": "Transações vencidas por usuário",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "parameters": [
          {
            "name": "id_usuario",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/transacao/somarTransacoes": {
      "get": {
        "tags": [
          "Transações"
        ],
        "summary": "Somar transações",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/transacao/{id}": {
      "put": {
        "tags": [
          "Transações"
        ],
        "summary": "Atualizar transação",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "delete": {
        "tags": [
          "Transações"
        ],
        "summary": "Deletar transação",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "patch": {
        "tags": [
          "Transações"
        ],
        "summary": "Editar transação",
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    }
  }
}


const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;