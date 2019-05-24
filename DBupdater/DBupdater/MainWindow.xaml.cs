using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace DBupdater
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly string _apiKey = System.IO.File.ReadAllText(@"F:\Documents\GitHub\FantasyInnlad\Finnlandet\DBupdater\DBupdater\key.txt");
        public MainWindow()
        {
            InitializeComponent();
        }
    }
}
