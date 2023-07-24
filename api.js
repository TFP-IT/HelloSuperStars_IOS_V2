export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIzYTI4OWYyMy0xY2YyLTRkOTMtYjNhZS03M2E1NDU4MzExMzMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY2MDY0MTU0NywiZXhwIjoxNjYxMjQ2MzQ3fQ.ndSmFc-VXC9LlY5OeCoEsEAfYI86rS5o9aV3-8IYF2E";

export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v1/meetings`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ region: "sg001" }),
  });

  const { meetingId } = await res.json();
  return meetingId;
};
