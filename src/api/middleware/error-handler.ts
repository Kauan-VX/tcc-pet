import { NextRequest, NextResponse } from 'next/server';

export async function withErrorHandling(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
): Promise<NextResponse> {
  try {
    return await handler(req);
  } catch (error: any) {
    console.error('API error:', error);

    const status = error.status || 500;
    const message = error.message || 'Erro interno do servidor';

    return NextResponse.json({ error: message }, { status });
  }
}
