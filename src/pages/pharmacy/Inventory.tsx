
import { useState } from "react";
import { Package, AlertTriangle, TrendingUp, Plus, Search, Filter, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/shared/DashboardLayout";

const PharmacyInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard/pharmacist", active: false },
    { icon: Package, label: "Inventory", href: "/pharmacy/inventory", active: true },
  ];

  const medications = [
    {
      id: 1,
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      unit: "tablets",
      expiryDate: "2025-06-15",
      batchNumber: "AMX2024001",
      costPrice: 0.15,
      sellPrice: 0.25,
      supplier: "PharmaCorp Ltd"
    },
    {
      id: 2,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      currentStock: 45,
      minStock: 100,
      maxStock: 1000,
      unit: "tablets",
      expiryDate: "2024-12-30",
      batchNumber: "PAR2024002",
      costPrice: 0.05,
      sellPrice: 0.10,
      supplier: "MediSupply Inc"
    },
    {
      id: 3,
      name: "Metformin 850mg",
      category: "Diabetes",
      currentStock: 280,
      minStock: 100,
      maxStock: 400,
      unit: "tablets",
      expiryDate: "2025-03-20",
      batchNumber: "MET2024003",
      costPrice: 0.20,
      sellPrice: 0.35,
      supplier: "DiabetesCare Co"
    }
  ];

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (current: number, min: number, max: number): { 
    status: string; 
    variant: "default" | "secondary" | "destructive" | "outline"; 
    color: string; 
  } => {
    if (current <= min) return { status: "Low", variant: "destructive", color: "text-destructive" };
    if (current <= min * 1.5) return { status: "Medium", variant: "secondary", color: "text-warning" };
    return { status: "Good", variant: "default", color: "text-success" };
  };

  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysDiff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 90; // Expiring within 90 days
  };

  const inventoryStats = {
    totalItems: medications.length,
    lowStock: medications.filter(m => m.currentStock <= m.minStock).length,
    expiringSoon: medications.filter(m => isExpiringSoon(m.expiryDate)).length,
    totalValue: medications.reduce((sum, m) => sum + (m.currentStock * m.costPrice), 0)
  };

  return (
    <DashboardLayout
      title="Inventory Management"
      role="pharmacist"
      userName="Dr. Pharmacy Manager"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
            <p className="text-muted-foreground">Monitor and manage medication stock levels</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              AI Insights
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryStats.totalItems}</div>
              <p className="text-xs text-muted-foreground">Different medications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{inventoryStats.lowStock}</div>
              <p className="text-xs text-destructive">Need reordering</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{inventoryStats.expiringSoon}</div>
              <p className="text-xs text-warning">Within 90 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${inventoryStats.totalValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Inventory worth</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search medications by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="inventory">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="inventory">Inventory List</TabsTrigger>
                <TabsTrigger value="lowstock">Low Stock</TabsTrigger>
                <TabsTrigger value="expiring">Expiring</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="inventory" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedications.map((medication) => {
                      const stockStatus = getStockStatus(medication.currentStock, medication.minStock, medication.maxStock);
                      const stockPercentage = (medication.currentStock / medication.maxStock) * 100;
                      
                      return (
                        <TableRow key={medication.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{medication.name}</div>
                              <div className="text-sm text-muted-foreground">{medication.supplier}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{medication.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">{medication.currentStock} {medication.unit}</span>
                                <span className="text-xs text-muted-foreground">
                                  {stockPercentage.toFixed(0)}%
                                </span>
                              </div>
                              <Progress value={stockPercentage} className="h-2" />
                              <div className="text-xs text-muted-foreground">
                                Min: {medication.minStock} | Max: {medication.maxStock}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={stockStatus.variant}>
                              {stockStatus.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className={isExpiringSoon(medication.expiryDate) ? "text-warning" : ""}>
                              {medication.expiryDate}
                              {isExpiringSoon(medication.expiryDate) && (
                                <div className="text-xs">⚠️ Expiring soon</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-mono text-sm">{medication.batchNumber}</span>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>Cost: ${medication.costPrice}</div>
                              <div className="font-medium">Sell: ${medication.sellPrice}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="lowstock" className="mt-6">
                <div className="space-y-4">
                  {medications.filter(m => m.currentStock <= m.minStock).map((medication) => (
                    <Card key={medication.id} className="border-destructive">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <AlertTriangle className="w-8 h-8 text-destructive" />
                            <div>
                              <h3 className="font-semibold">{medication.name}</h3>
                              <p className="text-sm text-muted-foreground">{medication.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-destructive">
                              {medication.currentStock} {medication.unit}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Min required: {medication.minStock}
                            </div>
                          </div>
                          <Button className="bg-gradient-primary hover:opacity-90">
                            Reorder Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="expiring" className="mt-6">
                <div className="space-y-4">
                  {medications.filter(m => isExpiringSoon(m.expiryDate)).map((medication) => (
                    <Card key={medication.id} className="border-warning">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <AlertTriangle className="w-8 h-8 text-warning" />
                            <div>
                              <h3 className="font-semibold">{medication.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Batch: {medication.batchNumber}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-warning">
                              {medication.expiryDate}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {Math.ceil((new Date(medication.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Discount Sale
                            </Button>
                            <Button variant="outline" size="sm">
                              Return to Supplier
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Stock Distribution by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Antibiotics</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div className="w-3/4 h-2 bg-primary rounded-full"></div>
                            </div>
                            <span className="text-sm">35%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Pain Relief</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div className="w-1/2 h-2 bg-secondary rounded-full"></div>
                            </div>
                            <span className="text-sm">25%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Diabetes</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div className="w-2/3 h-2 bg-success rounded-full"></div>
                            </div>
                            <span className="text-sm">30%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Consumption Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>This Month</span>
                          <span className="font-medium">$12,450</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Last Month</span>
                          <span className="font-medium">$11,230</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Growth</span>
                          <span className="font-medium text-success">+10.9%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PharmacyInventory;
