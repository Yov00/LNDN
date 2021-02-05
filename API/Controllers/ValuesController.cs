using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductController : Controller
    {
        //
        // GET: /Products/
        [Route("api/")]
        [HttpGet]
        public string Index()
        {
            // Add action logic here
            return "Devil Inside";
        }

        [Route("api/{id}")]
        [HttpGet]
        public string UserPage(int id)
        {
            return $"Your ID is {id.ToString()}";
        }
    }
}