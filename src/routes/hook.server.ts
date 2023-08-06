import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_AUTH_KEY } from '$env/static/private'

export const handle = SvelteKitAuth({
  providers: [Google({ clientId: GOOGLE_AUTH_KEY })],
});

