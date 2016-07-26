using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication5.Models;
using WebApplication5.Tools;
using System.IO;

namespace WebApplication5.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult GetBooks()
        {
            string xml = System.IO.File.ReadAllText("c:\\books.xml");
            var catalogInstance = xml.ParseXML<catalog>();
            return Json(catalogInstance.book, JsonRequestBehavior.AllowGet);
        }

        public ActionResult save()
        {
            var req = Request.InputStream;
            var booksObject = new StreamReader(req).ReadToEnd();
            string xml = booksObject.Serialize();

            System.IO.File.WriteAllText("C:\\books.xml", xml);

            return Json(null);
        }

    }
}