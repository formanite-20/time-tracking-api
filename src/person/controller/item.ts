import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as hal from '../formats/hal';
import * as personService from '../service';

import { Person as PersonSchema } from '../../typings';

class PersonItem extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.item(
      await personService.findById(
        +ctx.params.personId,
      )
    );
  }

  async put(ctx: Context) {

    ctx.request.validate<PersonSchema>('../../schema/person.json');

    const body = ctx.request.body;
    const person = await personService.findById(
      +ctx.params.personId,
    );

    person.name = body.name;

    await personService.update(person);
    ctx.status = 204;

  }

}

export default new PersonItem();
