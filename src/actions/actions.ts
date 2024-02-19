import OpenAI from "openai";

const promptPrepend = `We're going to play a creative crafting game. I will give you between 2 and 4 items, referred to as INPUT. Your job is to determine what new item could be crafted by combining these INPUT items. The key is creativity — don't just think about the most obvious outcome; imagine the most interesting or unexpected item that could result.

The combinations should be playful and inventive. While there's some randomness to the game, try to maintain a logical thread that connects the INPUT items to your OUTPUT. The same INPUT items might inspire different OUTPUT items in separate games, reflecting the game's dynamic nature. Similarly, identical OUTPUT items may stem from different INPUT combinations, showcasing the versatility of your creativity.

If you find the INPUT items could lead to several plausible OUTPUTs, feel free to pick the one that sparks the most interesting story in your mind. You're also welcome to introduce a theme for your game session (e.g., "In a magical world" or "In a post-apocalyptic future") to steer the creativity in a fun direction.

Restrictions on the OUTPUT item remain the same:

Must be between 1 and 4 words.
Should logically or creatively be seen as a combination of the INPUT items.
Provide the OUTPUT only, without an explanation or justification.
The OUTPUT should be a single item, not a list.
Avoid using a dash or bullet point in your response.
Do not repeat the INPUT items in your response.
End your response without a period.


Examples:
Example 1
'''
INPUT
- Rainbow
- Horse

OUTPUT
A unicorn
'''

Example 2
'''
INPUT
- A bundle of logs
- A match

OUTPUT
A fire
'''

Example 3
'''
INPUT
- A bundle of logs
- A match

OUTPUT
A forest fire
'''

Example 4
'''
INPUT
- Philosophers
- Conversations

OUTPUT
Democracy
'''

Example 5
'''
INPUT
- Earth
- Fire

OUTPUT
Volcano
'''

INPUT
`;

const promptAppend = `

OUTPUT
`;

type SelectedItems = string[];

export const fetchNewItem = async (selectedItems: SelectedItems, openAIKey: string) => {
  const openai = new OpenAI({
    apiKey: openAIKey,
    dangerouslyAllowBrowser: true
  });

  const prompt = `${promptPrepend}${selectedItems.join("\n")}${promptAppend}`;
  console.log("prompt:", prompt);
  let response;
  try {
    response = await openai.chat.completions.create({
      // model: "gpt-3.5-turbo",
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }

  return { text: response?.choices[0].message.content || "", selected: false };
};

export const fetchImage = async (selectedItems: SelectedItems, openAIKey: string) => {
  const openai = new OpenAI({
    apiKey: openAIKey,
    dangerouslyAllowBrowser: true
  });

  const prompt = `Create a triumphant image that incorporates the following items: ${selectedItems.join(
    ", "
  )}`;
  console.log("prompt:", prompt);
  let response;
  try {
    response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }

  return response?.data[0]?.url || "";
};
