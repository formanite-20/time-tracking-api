import ketting from './ketting';
import { LinkNotFound } from 'ketting';



export async function addUserPrivilege(principal: string|URL, privilege: string, resource: string|URL): Promise<void> {
  let userPrivilegesRes;

  try {
    userPrivilegesRes = await ketting.go(principal.toString()).follow('privileges');
  } catch (err) {
    if (err instanceof LinkNotFound) {
      throw new Error('Link with "privileges" is not found on the user resource.');
    }
    throw err;
  }

  const userPrivilegesState = await userPrivilegesRes.get();
  if (!userPrivilegesState.hasAction('add')) {
    throw new Error('The privileges resource on a12nserver does not have an \'add\' action. You likely need to update your a12n-server for this to work');
  }
  await userPrivilegesState.action('add').submit({
    action: 'add',
    privilege,
    resource: resource.toString()
  });
}
