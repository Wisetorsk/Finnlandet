using System;
using System.ComponentModel;
using System.IO;
using System.Windows.Forms;

// This is the code for your desktop app.
// Press Ctrl+F5 (or go to Debug > Start Without Debugging) to run your app.

namespace JSON_loader
{
    public partial class Form1 : Form
    {

        private static string _filename = "blog.json";

        public Form1()
        {
            InitializeComponent();
        }

        private void openFileDialog1_FileOk(object sender, CancelEventArgs e)
        {

        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            /*WRITE TO FILE*/
            if (File.Exists(_filename))
            {
                using (var file =
                    File.AppendText(_filename))
                {
                    file.Write("TEST");
                }
            }
            else
            {
                using (var file =
                    File.CreateText(_filename))
                {
                    file.WriteLine("TEST");
                }
            }

        }

        private void button2_Click(object sender, EventArgs e)
        {
            //_filename = sender.ToString();

        }

        private void textBox2_TextChanged(object sender, EventArgs e)
        {
            //_filename = sender.ToString();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
}
