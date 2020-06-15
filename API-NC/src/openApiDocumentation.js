//const { USER_TYPES, REGULAR } = require('./config/constants');

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Users',
    description: 'User management API',
    contact: {
      name: 'Gabriel Ferreira Rodrigues',
      email: 'gabriel.port@gmail.com',
      url: ''
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local server'
    },
    {
      url: 'http://localhost:3001/',
      description: 'User'
    }
  ],
  security: [
    {
      JWT: []
    }
  ],
  tags: [
    {
      name: 'CRUD operations'
    }
  ],
  paths: {
    '/users': {
      get: {
        tags: ['CRUD operations'],
        description: 'Get users',
        operationId: 'getUsers',
        // parameters: [
        //   {
        //     name: 'x-company-id',
        //     in: 'header',
        //     schema: {
        //       $ref: '#/components/schemas/companyId'
        //     },
        //     required: true,
        //     description: 'Company id where the users work'
        //   },
        //   {
        //     name: 'page',
        //     in: 'query',
        //     schema: {
        //       type: 'integer',
        //       default: 1
        //     },
        //     required: false
        //   },
        //   {
        //     name: 'orderBy',
        //     in: 'query',
        //     schema: {
        //       type: 'string',
        //       enum: ['asc', 'desc'],
        //       default: 'asc'
        //     },
        //     required: false
        //   }
        // ],
        responses: {
          '200': {
            description: 'Users were obtained',
            content: {
              'application/json': {
                schema: {
                //   $ref: '#/components/schemas/Users'
                }
              }
            }
          },
          '400': {
            description: 'Missing parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters'
                }
              }
            }
          }
        }
       },
      post: {
        tags: ['CRUD operations'],
        description: 'Create users',
        operationId: 'createUsers',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Users'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'New users were created'
          },
          '400': {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'User identificationNumbers 10, 20 already exist',
                  internal_code: 'invalid_parameters'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      identificationNumber: {
        type: 'integer',
        description: 'User identification number',
        example: 1234
      },
      username: {
        type: 'string',
        example: 'raparicio'
      },
      companyId: {
        type: 'integer',
        description: 'Company id where the user works',
        example: 15
      },
      User: {
        type: 'object',
        properties: {
          identificationNumber: {
            $ref: '#/components/schemas/identificationNumber'
          },
          username: {
            $ref: '#/components/schemas/username'
          },
          userType: {
            $ref: '#/components/schemas/userType'
          },
          companyId: {
            $ref: '#/components/schemas/companyId'
          }
        }
      },
      Users: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/User'
            }
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          internal_code: {
            type: 'string'
          }
        }
      }
    },
    securitySchemes: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'x-access-token'
      }
    }
  }
};