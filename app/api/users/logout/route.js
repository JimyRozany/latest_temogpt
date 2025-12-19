import { cookies } from "next/headers";

/**
 * @method GET
 * @url ~/api/users/logout
 * @desc logout user
 * @access public // any user can logout
 */

// export async function GET(req) {
//   try {
//     const cookie = await req.cookies?.delete("auth-token");
//     return Response.json({ message: "logout" }, { status: 200 });
//   } catch (error) {
//     return Response.json(
//       { message: "internal server error ", error },
//       { status: 500 }
//     );
//   }
// }
// -----------------
export async function GET(req) {
  try {
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `auth-token=; Path=/; Max-Age=0; HttpOnly; Secure`
    );
    return new Response(JSON.stringify({ message: "logout" }), {
      headers,
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "internal server error", error }),
      { status: 500 }
    );
  }
}
