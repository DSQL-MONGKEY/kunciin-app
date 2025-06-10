import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/server';

export async function POST(req: Request) {
   try {

      const payload = await req.json();
      const { fingerprintId, rfId } = payload;

      // Validasi
      if (!fingerprintId || !rfId) {
         return NextResponse.json(
            { error: 'Fingert print and RFID are required' },
            { status: 400 }
         );
      }

      const { data, error } = await supabase
         .from('user_credentials')
         .insert([{
            fingerprint_id: fingerprintId,
            rfid_uid: rfId, 
         }])
         .select()

      if (!data || error) {
            return NextResponse.json({
               error: 'Failed to insert data into database',
               details: error.message
            }, { status: 500 }
         );
      }

      return NextResponse.json({ 
         success: true, 
         data 
      }, { status: 201 });

   } catch (error) {

      if (error instanceof Error) {
         return NextResponse.json({
            error: 'An error occurred while processing your request',
            details: error.message
         }, { status: 500 });
      }

   }
}

export async function GET() {
   try {

      const { data, error } = await supabase
         .from('user_credentials')
         .select('*')
         .order('created_at', { ascending: true });

      if(!data || error) {
         return NextResponse.json({
            error: 'Failed to fetch devices'
         }, { status: 500});
      }

      return NextResponse.json({
         data 
      }, { status: 200 })

   } catch (error) {

      if(error instanceof Error) {
         return NextResponse.json({
            error: 'An error occurred while fetching devices',
            details: error.message
         }, { status: 500 });
      }

   }
}