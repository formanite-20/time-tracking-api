import Controller from '@curveball/controller';
import { Context } from '@curveball/core';
import { BadRequest } from '@curveball/http-errors';
import { EntryNew as EntryNewSchema } from '../../typings';

import * as entryService from '../service';
import * as projectService from '../../project/service';
import * as personService from '../../person/service';
import * as hal from '../formats/hal';

class EntryCollectionPerson extends Controller {

  async get(ctx: Context) {

    const person = await personService.findById(
      +ctx.params.personId,
    );
    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.collection(
      person,
      await entryService.findByPerson(person),
    );

  }

  async post(ctx: Context) {

    ctx.request.validate<EntryNewSchema>('../../schema/entry-new.json');

    const person = await personService.findById(
      +ctx.params.personId,
    );
    const body = ctx.request.body;

    const projectUrl = ctx.request.links.get('project');

    if (!projectUrl) {
      throw new BadRequest('A link with rel "project" must be provided');
    }

    const projectId = (projectUrl.href.split('/').pop());
    if (!projectId) {
      throw new BadRequest('The project link must be in the format /projects/123');
    }

    const project = await projectService.findById(+projectId);

    const entry = await entryService.create({
      person,
      project,
      description: body.description,
      minutes: body.minutes,
      date: body.date,
      billable: body.billable,
    });

    ctx.status = 201;
    ctx.response.headers.set('Location', entry.href);
  }

}

export default new EntryCollectionPerson();
