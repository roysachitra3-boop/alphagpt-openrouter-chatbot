export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  image?: string;
  saved?: boolean;
}

export interface ModelOption {
  id: string;
  name: string;
  description: string;
  provider: string;
}

export const DEFAULT_MODELS: ModelOption[] = [
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Fast, intelligent, and cost-effective model by OpenAI',
    provider: 'OpenAI',
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    description: 'Flagship high-intelligence model by OpenAI',
    provider: 'OpenAI',
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    description: 'Highest capability model by Anthropic',
    provider: 'Anthropic',
  },
  {
    id: 'deepseek/deepseek-r1',
    name: 'DeepSeek R1',
    description: 'Advanced reasoning model by DeepSeek',
    provider: 'DeepSeek',
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B',
    description: 'Open-weight state of the art model by Meta',
    provider: 'Meta',
  },
  {
    id: 'google/gemini-flash-1.5',
    name: 'Gemini Flash 1.5',
    description: 'Lightweight, ultra-fast model by Google',
    provider: 'Google',
  },
];

const API_KEY_STORAGE_KEY = 'alphagpt_openrouter_api_key';
const SELECTED_MODEL_KEY = 'alphagpt_selected_model';

export function getStoredApiKey(): string {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
}

export function setStoredApiKey(key: string): void {
  localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
}

export function removeStoredApiKey(): void {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
}

export function getStoredModel(): string {
  return localStorage.getItem(SELECTED_MODEL_KEY) || 'openai/gpt-4o-mini';
}

export function setStoredModel(modelId: string): void {
  localStorage.setItem(SELECTED_MODEL_KEY, modelId);
}

export async function sendMessageToOpenRouter(
  messages: ChatMessage[],
  apiKey?: string,
  modelId?: string,
  onStreamChunk?: (chunk: string) => void
): Promise<string> {
  const key = apiKey || getStoredApiKey();
  const model = modelId || getStoredModel();

  if (!key) {
    throw new Error('OpenRouter API Key is missing. Please enter your API key in the top bar or settings.');
  }

  // Format messages for OpenRouter payload
  const formattedMessages = messages.map((m) => {
    if (m.image) {
      return {
        role: m.role,
        content: [
          { type: 'text', text: m.content },
          { type: 'image_url', image_url: { url: m.image } },
        ],
      };
    }
    return {
      role: m.role,
      content: m.content,
    };
  });

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'AlphaGPT',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: formattedMessages,
      stream: !!onStreamChunk,
    }),
  });

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errorJson = await response.json();
      errorDetail = errorJson?.error?.message || response.statusText;
    } catch {
      errorDetail = response.statusText;
    }
    throw new Error(`OpenRouter Error (${response.status}): ${errorDetail}`);
  }

  if (onStreamChunk && response.body) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullText = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data: ')) {
          const dataStr = trimmed.substring(6);
          if (dataStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(dataStr);
            const delta = parsed.choices?.[0]?.delta?.content || '';
            if (delta) {
              fullText += delta;
              onStreamChunk(fullText);
            }
          } catch {
            // parse error on chunk, ignore
          }
        }
      }
    }
    return fullText;
  } else {
    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }
}
