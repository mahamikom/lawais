// FlowHunt API Service
const FLOWHUNT_API_KEY = import.meta.env.VITE_FLOWHUNT_API_KEY;
const FLOWHUNT_BASE_URL = import.meta.env.VITE_FLOWHUNT_BASE_URL;
const FLOWHUNT_FLOW_ID = import.meta.env.VITE_FLOWHUNT_FLOW_ID;

export interface FlowHuntMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface FlowHuntResponse {
  output: string;
  sessionId?: string;
}

/**
 * Send a message to FlowHunt Legal Consultation AI Assistant
 */
export async function sendConsultation(
  message: string,
  sessionId?: string
): Promise<FlowHuntResponse> {
  try {
    const response = await fetch(`${FLOWHUNT_BASE_URL}/v2/flows/${FLOWHUNT_FLOW_ID}/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FLOWHUNT_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: {
          user_message: message,
        },
        session_id: sessionId || undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(`FlowHunt API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      output: data.output || data.response || 'لم يتم استلام رد من الخادم',
      sessionId: data.session_id || sessionId,
    };
  } catch (error) {
    console.error('FlowHunt API Error:', error);
    throw new Error('فشل الاتصال بخدمة الاستشارات القانونية. يرجى المحاولة مرة أخرى.');
  }
}

/**
 * Send a message with streaming response
 */
export async function* sendConsultationStream(
  message: string,
  sessionId?: string
): AsyncGenerator<string, void, unknown> {
  try {
    const response = await fetch(`${FLOWHUNT_BASE_URL}/v2/flows/${FLOWHUNT_FLOW_ID}/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FLOWHUNT_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: {
          user_message: message,
        },
        session_id: sessionId || undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(`FlowHunt API Error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('لا يمكن قراءة الاستجابة من الخادم');
    }

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          if (data === '[DONE]') {
            return;
          }
          
          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              yield parsed.content;
            }
          } catch (e) {
            // Skip invalid JSON
            continue;
          }
        }
      }
    }
  } catch (error) {
    console.error('FlowHunt Streaming Error:', error);
    throw new Error('فشل الاتصال بخدمة الاستشارات القانونية');
  }
}
