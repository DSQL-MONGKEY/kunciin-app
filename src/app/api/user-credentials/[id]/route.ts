import { supabase } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request,  { params }: { params: Promise<{ id: string }> }) {
   try {
      const { id } = await params;

      const { data, error } =  await supabase
         .from('user_credentials')
         .select('*')
         .eq('id', id)
         .single();

      if(!data || error) {
         return NextResponse.json({
            error: 'Record not found',
         }, { status: 404 });
      }

      return NextResponse.json({
         success: true,
         data,
      }, { status: 200 });

   } catch (error) {
      if(error instanceof Error) {
         return NextResponse.json({
            error: 'An error occurred while processing your request',
            details: error.message
         }, { status: 500 });
      }
   }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
   try {
      
      const { id } = await params;
      const body = await req.json();
      const { 
         fingerprintId, 
         rfId
      } = body;

      const { data, error } = await supabase
         .from('user_credentials')
         .update({ 
            fingerprint_id: fingerprintId,
            rfid_uid: rfId,
         })
         .eq('id', id)
         .select()
         .single();



      if(!data || error) {
         return NextResponse.json({
            error: 'Failed to update data',
            message: error?.message
         }, { status: 500 });
      }

      return NextResponse.json({
         success: true,
         data
      }, { status: 201 });

   } catch(error) {

      if(error instanceof Error) {
         return NextResponse.json({
            error: 'An error occurred while processing your request',
            details: error.message
         }, { status: 500 });
      }

   }
}

export async function DELETE(req: Request,{ params }: { params: Promise<{ id: string }> }) {
   try {

      const { id } = await params;
      const {data, error} = await supabase
         .from('user_credentials')
         .delete()
         .eq('id', id)
         .select();
      
      if(error) {
         return NextResponse.json({
            error: 'Failed to delete data',
            message: error.message
         }, { status: 500 });
      }

      return NextResponse.json({
         success: true,
         message: 'Record deleted successfully',
         data,
      }, { status: 200 });
   
   } catch(error) {

      if(error instanceof Error) {
         return NextResponse.json({
            error: 'An error occurred while processing your request',
            details: error.message
         }, { status: 500 });
      }

   }
}