

type TCredentials = {
   fingerprintId: number;
   rfId: string;
}

export const addCredentials = async ({ fingerprintId, rfId }:TCredentials  ) => {
   const response = await fetch(`/api/user-credentials`, {
      method: 'POST',
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