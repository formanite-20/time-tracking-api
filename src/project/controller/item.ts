import Controller from '@curveball/controller';
import { Context } from '@curveball/core';
import { BadRequest } from '@curveball/http-errors';

import { Project as ProjectSchema } from '../../typings';

import * as projectService from '../service';
import * as clientService from '../../client/service';
import * as hal from '../formats/hal';

class Project extends Controller {

  async get(ctx: Context) {
    ctx.response.body = hal.item(
      await projectService.findById(
        +ctx.params.projectId,
      )
    );
  }

  async put(ctx: Context) {
    const project = await projectService.findById(+ctx.params.projectId);

    ctx.request.validate<ProjectSchema>(
      '../../schema/project.json'
    );
    const body = ctx.request.body;

    const clientUrl = ctx.request.links.get('client');
    if (clientUrl) {
      const clientId = clientUrl.href.split('/').pop();
      if (!clientId) {
        throw new BadRequest(
          'The client link must be in the format /client/123'
        );
      }

      const client = await clientService.findById(+clientId);
      project.client = client;
    }

    project.name = body.name;
    await projectService.update(project);

    ctx.status = 204;
    ctx.response.links.add({
      rel: 'invalidates',
      href: '/project',
    });
  }


}

export default new Project();
