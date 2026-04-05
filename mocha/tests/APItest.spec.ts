import { expect } from 'chai';
import { ObjectClient } from '../helper/objects-client.ts';

describe('Test RESTful API', () => {
  const object = new ObjectClient();
  let response: { status: number; body: any };
  let createdIds: string[];
  let originalPayload: any;

  describe('Test Get /objects', () => {
    describe('Test with empty list of objects', () => {
      it('Get /objects: check that request returns empty list when there are no objects', async () => {
        response = await object.getObjects();
        expect(response.status).equal(200);
        expect(response.body.length).equal(0);
      });
    });

    describe('Tests with not empty list of objects', () => {
      before(async () => {
        originalPayload = [
          {
            name: 'Test Karyna1',
            data: {
              year: 2013,
              price: 1049.99
            }
          },
          {
            name: 'Test Karyna2',
            data: {
              year: 2019,
              price: 1849.99
            }
          }
        ];

        for (const element of originalPayload) {
          await object.createObject(element);
        }
        response = await object.getObjects();
        createdIds = response.body.map((value: any) => value.id);
      });

      after(async () => {
        //deleting all existing objects
        const responseForDeleting = await object.getObjects();
        for (const element of responseForDeleting.body) {
          await object.deleteObjectById(element.id);
        }
      });

      it('Get /objects: check that request returns the list of objects equal created ones', async () => {
        response = await object.getObjects();
        expect(response.status).equal(200);
        expect(response.body.length).to.be.greaterThan(0);
        const actualIds = response.body.map((value: any) => value.id);
        expect(actualIds).to.deep.equal(createdIds);
      });

      it('GET /objects: check request with several ids parameters', async () => {
        response = await object.getObjects(createdIds);
        expect(response.status).equal(200);
        const actualIds = response.body.map((value: any) => value.id);
        expect(actualIds).to.deep.equal(createdIds);
      });
    });
  });

  describe('Test Get /objects/{id}', () => {
    before(async () => {
      originalPayload = {
        name: 'Test Karyna Get Object',
        data: {
          year: 2013,
          price: 1049.99
        }
      };

      await object.createObject(originalPayload);
      response = await object.getObjects();
    });

    after(async () => {
      await object.deleteObjectById(response.body[0].id);
    });

    it('GET /objects/{id}: check by existing id', async () => {
      const existingId = response.body[0].id;
      const responseByID = await object.getObjectById(existingId);
      expect(responseByID.status).equal(200);
      expect(responseByID.body.id).equal(existingId);
      expect(responseByID.body).to.deep.include(originalPayload);
    });

    it('GET /objects/{id}: check by not existing id', async () => {
      const notExistingId = 'TestDog';
      const responseByNotExistingID = await object.getObjectById(notExistingId);
      expect(responseByNotExistingID.status).equal(404);
    });
  });

  describe('Test POST /objects', () => {
    after(async () => {
      //deleting all existing objects
      const responseForDeleting = await object.getObjects();
      for (const element of responseForDeleting.body) {
        await object.deleteObjectById(element.id);
      }
    });

    it('POST /objects: create a new valid object', async () => {
      const originalPayload = {
        name: 'Test Karyna Happy',
        data: {
          year: 2019,
          price: 1849.99
        }
      };
      const postResponse = await object.createObject(originalPayload);
      expect(postResponse.status).equal(200);
      expect(postResponse.body).to.deep.include(originalPayload);
      const createdId = postResponse.body.id;
      //get a new created object and verify it
      const responseByID = await object.getObjectById(createdId);
      expect(responseByID.status).equal(200);
      expect(responseByID.body.id).equal(createdId);
      expect(responseByID.body).to.deep.include(originalPayload);
    });

    it('POST /objects: create an object with invalid body format', async () => {
      const invalidPayload = [
        {
          name: 'Test Karyna Failed1',
          data: {
            year: 2019,
            price: 1849.99
          }
        },
        {
          name: 'Test Karyna Failed1',
          data: {
            year: 2019,
            price: 1849.99
          }
        }
      ];
      const response = await object.createInvalidObject(invalidPayload);
      expect(response.status).equal(400);
    });
  });

  describe('Test PUT /objects/{id}', () => {
    before(async () => {
      originalPayload = {
        name: 'Test Karyna - Pending Update',
        data: {
          year: 2013,
          price: 1049.99
        }
      };

      await object.createObject(originalPayload);
      response = await object.getObjects();
      createdIds = response.body.map((value: any) => value.id);
    });

    after(async () => {
      //deleting all existing objects
      const responseForDeleting = await object.getObjects();
      for (const element of responseForDeleting.body) {
        await object.deleteObjectById(element.id);
      }
    });

    it('PUT /objects/{id}: check that existing object is fully updated', async () => {
      const updatingPayload = {
        name: 'Test Karyna - Updated',
        data: {
          year: 2020,
          price: 1850
        }
      };

      const updatedID = createdIds[0];
      const responseFullyUpdateObject = await object.fullyUpdateObject(updatingPayload, updatedID);
      expect(responseFullyUpdateObject.status).equal(200);
      expect(responseFullyUpdateObject.body.id).equal(updatedID);
      expect(responseFullyUpdateObject.body).to.deep.include(updatingPayload);
      //get updated object and verify it
      const responseByID = await object.getObjectById(updatedID);
      expect(responseByID.status).equal(200);
      expect(responseByID.body.id).equal(updatedID);
      expect(responseByID.body).to.deep.include(updatingPayload);
    });

    it('PUT /objects/{id}: check by not existing id', async () => {
      const updatingPayload = {
        name: 'Updated Test Karyna Happy',
        data: {
          year: 2019,
          price: 1849.99
        }
      };

      const invalidID = 'TestObject';
      const responseFullyUpdateObject = await object.fullyUpdateObject(updatingPayload, invalidID);
      expect(responseFullyUpdateObject.status).equal(404);
    });
  });

  describe('Test PATCH /objects/{id}', () => {
    before(async () => {
      //create one object
      originalPayload = {
        name: 'Test Karyna - Pending Update',
        data: {
          year: 2013,
          price: 1049.99
        }
      };

      await object.createObject(originalPayload);
      response = await object.getObjects();
      createdIds = response.body.map((value: any) => value.id);
    });

    after(async () => {
      //deleting all existing objects
      const responseForDeleting = await object.getObjects();
      for (const element of responseForDeleting.body) {
        await object.deleteObjectById(element.id);
      }
    });

    it('PATCH /objects/{id}: check that existing object is fully updated', async () => {
      const updatingPayload = {
        name: 'Test Karyna - Updated'
      };

      const updatedID = createdIds[0];
      const responsePartialUpdateObject = await object.partialUpdateObject(updatingPayload, updatedID);
      expect(responsePartialUpdateObject.status).equal(200);
      expect(responsePartialUpdateObject.body.id).equal(updatedID);
      expect(responsePartialUpdateObject.body.name).equal(updatingPayload.name);
      expect(responsePartialUpdateObject.body.data).deep.equal(originalPayload.data);
      //get updated object and verify it
      const responseByID = await object.getObjectById(updatedID);
      expect(responseByID.status).equal(200);
      expect(responseByID.body.id).equal(updatedID);
      expect(responseByID.body.name).equal(updatingPayload.name);
      expect(responseByID.body.data).deep.equal(originalPayload.data);
    });

    it('PATCH /objects/{id}: check by not existing id', async () => {
      const updatingPayload = {
        name: 'Updated Test Karyna'
      };

      const invalidID = 'TestObject';
      const responsePartialUpdateObject = await object.partialUpdateObject(updatingPayload, invalidID);
      expect(responsePartialUpdateObject.status).equal(404);
    });
  });

  describe('DELETE /objects', () => {
    before(async () => {
      //create one object
      originalPayload = {
        name: 'Test Karyna Delete Object',
        data: {
          year: 2013,
          price: 1049.99
        }
      };

      await object.createObject(originalPayload);
      response = await object.getObjects();
      createdIds = response.body.map((value: any) => value.id);
    });

    after(async () => {
      await object.deleteObjectById(response.body[0].id);
    });

    it('DELETE /objects/{id}: check by existing id', async () => {
      const deleteID = createdIds[0];
      const responseDeleteObject = await object.deleteObjectById(deleteID);
      expect(responseDeleteObject.status).equal(200);
      const responseAfterDeletion = await object.getObjectById(deleteID);
      expect(responseAfterDeletion.status).equal(404);
    });

    it('DELETE /objects/{id}: check by not existing id', async () => {
      const deleteID = 'TestDog';
      const responseDeleteObject = await object.deleteObjectById(deleteID);
      expect(responseDeleteObject.status).equal(404);
    });
  });
});
