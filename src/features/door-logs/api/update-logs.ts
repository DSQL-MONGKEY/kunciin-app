

type TCredentials = {
   fingerprintId: number;
   rfId: string;
}

export const updateCredentials = async ({ fingerprintId, rfId }:TCredentials, id:number ) => {
   const response = await fetch(`/api/door-logs/${id}`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         fingerprintId,
         rfId,
      }),
   });
   const data = await response.json();

   return data;
}