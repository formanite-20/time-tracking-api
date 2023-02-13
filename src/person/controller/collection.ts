import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as hal from '../formats/hal';
import * as personService from '../service';

import { PersonNew as PersonNewSchema } from '../../typings';

class PersonCollection extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.collection(
      await personService.findAll()
    );

  }
  async post(ctx: Context) {

    ctx.request.validate<PersonNewSchema>('../../schema/person-new.json');

    const body = ctx.request.body;
    const person = await personService.create({
      name: body.name,
      principalUri: null,
    });

    ctx.status = 201;
    ctx.response.headers.set('Location', person.href);

  }
}

export default new PersonCollection();
