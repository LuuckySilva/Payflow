using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace PaymentService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WebhookController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public WebhookController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<IActionResult> HandleWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        try
        {
            var webhookSecret = _configuration["Stripe:WebhookSecret"];
            var stripeEvent = EventUtility.ConstructEvent(
                json,
                Request.Headers["Stripe-Signature"],
                webhookSecret
            );

            if (stripeEvent.Type == "checkout.session.completed")
            {
                var session = stripeEvent.Data.Object as Stripe.Checkout.Session;
                var userId = session?.Metadata["userId"];
                var planId = session?.Metadata["planId"];

                Console.WriteLine($"Pagamento confirmado — userId: {userId}, plano: {planId}");
            }

            return Ok();
        }
        catch (StripeException e)
        {
            Console.WriteLine($"Erro no webhook: {e.Message}");
            return BadRequest();
        }
    }

    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new { status = "ok", service = "payment-service" });
    }
}