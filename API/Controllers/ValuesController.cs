using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace API.Controllers
{
    public class ValuesController : Controller
    {
        private  DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }
        //
        // GET: /Products/
        [Route("api/")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Value>>> Index()
        {
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        }

        [Route("api/{id}")]
        [HttpGet]
        public async Task<ActionResult<Value>> Get(int id)
        {
            var value = await _context.Values.FindAsync(id);
            if(value  != null)
            {
                return Ok(value);
            }
            return Ok("No value found");
        }
    }
}