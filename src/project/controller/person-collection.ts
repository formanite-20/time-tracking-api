import { PersonProjectForm } from '../../typings/person-project-form';
import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import * as projectService from '../service';



class ProjectPersonCollection extends Controller {

  async post(ctx: Context) {

    ctx.request.validate<PersonProjectForm>('../../schema/person-project-form.json');

    const params = {
      role: ctx.request.body.role,
      name: ctx.request.body.name,
      href: ctx.request.body.href
    };

    await projectService.addPersonToProject(params);

    ctx.status = 201;

  }

}

export default new ProjectPersonCollection();
